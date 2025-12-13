import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUserId, setLastUserId] = useState(null); // Track last processed user ID

    // Helper function to get role from localStorage
    const getStoredRole = (userId) => {
        try {
            const stored = localStorage.getItem(`user_role_${userId}`);
            return stored || 'student';
        } catch {
            return 'student';
        }
    };

    // Helper function to store role in localStorage
    const storeRole = (userId, role) => {
        try {
            localStorage.setItem(`user_role_${userId}`, role);
        } catch (error) {
            console.warn('Failed to store role in localStorage:', error);
        }
    };

    // Check if user is logged in on app start
    useEffect(() => {
        console.log('🔐 Starting simple auth check...');

        const checkAuthStatus = async () => {
            console.log('🔍 Checking auth status...');
            try {
                console.log('📡 Fetching session from Supabase...');
                // Add execution timeout to prevent indefinite hanging
                const sessionPromise = supabase.auth.getSession();
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Auth check timeout')), 5000)
                );

                const { data: { session }, error: sessionError } = await Promise.race([
                    sessionPromise,
                    timeoutPromise
                ]);

                if (sessionError) {
                    console.error('❌ Session fetch error:', sessionError);
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                    return;
                }

                console.log('📊 Session result:', session ? 'Found session' : 'No session');

                if (session?.user) {
                    console.log('👤 User found in session:', session.user.id);

                    // Fetch profile from DB for initial load
                    let userRole = 'student';
                    let profileAvatar = null;
                    let profileName = null;

                    try {
                         const { data: profile } = await supabase
                            .from('profiles')
                            .select('role, full_name, avatar_url')
                            .eq('id', session.user.id)
                            .single();

                        if (profile) {
                            userRole = profile.role || 'student';
                            profileAvatar = profile.avatar_url;
                            profileName = profile.full_name;
                            storeRole(session.user.id, userRole);
                        } else {
                            userRole = getStoredRole(session.user.id);
                        }
                    } catch (e) {
                         console.error("Error fetching initial profile:", e);
                         userRole = getStoredRole(session.user.id);
                    }

                    console.log('💾 Effective role:', userRole);

                    const userData = {
                        id: session.user.id,
                        name: profileName || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                        email: session.user.email,
                        avatar: profileAvatar || session.user.user_metadata?.avatar_url || null,
                        role: userRole
                    };

                    console.log('👤 Setting user data:', userData);
                    setUser(userData);
                    setIsAuthenticated(true);
                    console.log('✅ Authentication successful');

                } else {
                    console.log('❌ No user session found');
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('❌ Error checking auth status:', error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                console.log('🏁 Auth check completed, setting loading to false');
                setLoading(false);
            }
        };

        checkAuthStatus();

        // Simple auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('🔐 Auth state change detected:', event, session?.user?.id || 'No user');

                if (session?.user) {
                    // Skip if this is the same user we already processed
                    if (lastUserId === session.user.id) {
                        console.log('🔄 Same user, no action needed');
                        return;
                    }

                    console.log('🆔 New user detected');
                    setLastUserId(session.user.id);

                    // Fetch profile to get role directly from DB
                    let userRole = 'student';
                    let profileAvatar = null;
                    let profileName = null;

                    try {

                        // Fetch profile with timeout
                        const profilePromise = supabase
                            .from('profiles')
                            .select('role, full_name, avatar_url')
                            .eq('id', session.user.id)
                            .single();

                        const timeoutPromise = new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('Profile fetch timed out')), 10000)
                        );

                        const { data: profile } = await Promise.race([
                            profilePromise,
                            timeoutPromise
                        ]);

                        if (profile) {
                            userRole = profile.role || 'student';
                            profileAvatar = profile.avatar_url;
                            profileName = profile.full_name;
                            // Update local storage
                            storeRole(session.user.id, userRole);
                        }
                    } catch (error) {
                        console.error("Error fetching profile on auth change:", error);
                        // Fallback to stored role
                        userRole = getStoredRole(session.user.id);
                    }

                    const userData = {
                        id: session.user.id,
                        name: profileName || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                        email: session.user.email,
                        avatar: profileAvatar || session.user.user_metadata?.avatar_url || null,
                        role: userRole
                    };

                    console.log('👤 Setting user data from auth change:', userData);
                    setUser(userData);
                    setIsAuthenticated(true);

                } else {
                    console.log('🚪 User logged out');
                    setLastUserId(null);
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        console.log('🔑 Starting login process for:', email);
        try {
            console.log('📡 Sending login request to Supabase...');

            // Add timeout for login request
            const loginPromise = supabase.auth.signInWithPassword({
                email,
                password,
            });
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Login request timed out')), 5000)
            );

            const { data, error } = await Promise.race([
                loginPromise,
                timeoutPromise
            ]);

            if (error) {
                console.error('❌ Login failed:', error.message);
                throw new Error(error.message);
            }

            console.log('✅ Login successful for user:', data.user?.id);
            return data;
        } catch (error) {
            console.error('❌ Login error:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        console.log('📝 Starting registration process for:', userData.email);
        try {
            console.log('📡 Sending registration request to Supabase...');
            const { data, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        name: userData.name,
                        school: userData.school,
                        grade: userData.grade
                    }
                }
            });

            if (error) {
                console.error('❌ Registration failed:', error.message);
                throw new Error(error.message);
            }

            console.log('✅ Registration successful for user:', data.user?.id);
            // Note: Profile will be created automatically by the database trigger
            // No need to manually create it here since upsert handles both create and update

            return data;
        } catch (error) {
            console.error('❌ Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        console.log('🚪 Starting logout process...');

        // Clear stored role on logout
        if (user?.id) {
            console.log('🗑️ Clearing stored role for user:', user.id);
            try {
                localStorage.removeItem(`user_role_${user.id}`);
            } catch (error) {
                console.warn('⚠️ Failed to clear role from localStorage:', error);
            }
        }

        try {
            console.log('📡 Sending logout request to Supabase...');
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('❌ Logout error:', error);
            } else {
                console.log('✅ Logout successful');
            }
        } catch (error) {
            console.error('❌ Logout exception:', error);
        }
    };

    // Function to manually update user role (useful for admin role changes)
    const updateUserRole = async (newRole) => {
        if (!user?.id) {
            console.log('⚠️ No user available for role update');
            return;
        }

        console.log('🎭 Starting role update to:', newRole, 'for user:', user.id);
        try {
            console.log('📡 Updating role in database...');
            // Update in database
            const { error } = await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', user.id);

            if (error) {
                console.error('❌ Database role update failed:', error);
                return;
            }

            console.log('💾 Storing role in localStorage...');
            // Update in localStorage
            storeRole(user.id, newRole);

            console.log('👤 Updating role in state...');
            // Update in state
            setUser(prev => prev ? { ...prev, role: newRole } : null);

            console.log('✅ Role updated successfully:', newRole);
        } catch (error) {
            console.error('❌ Role update exception:', error);
        }
    };

    // Function to refresh profile data from database
    const refreshProfile = async () => {
        if (!user?.id) {
            console.log('⚠️ No user ID available for profile refresh');
            return;
        }

        console.log('🔄 Starting profile refresh for user:', user.id);
        try {
            console.log('📡 Fetching updated profile...');
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role, full_name, avatar_url')
                .eq('id', user.id)
                .single();

            if (profileError) {
                console.warn('⚠️ Profile refresh error:', profileError);
                return;
            }

            if (profile) {
                const userRole = profile.role || 'student';
                console.log('💾 Storing updated role:', userRole);
                storeRole(user.id, userRole);

                console.log('👤 Updating user data in state...');
                setUser(prev => prev ? {
                    ...prev,
                    name: profile.full_name || prev.name,
                    avatar: profile.avatar_url || prev.avatar,
                    role: userRole
                } : null);

                console.log('✅ Profile refreshed successfully');
            }
        } catch (error) {
            console.warn('⚠️ Profile refresh failed:', error.message || error);
        }
    };

    const value = {
        isAuthenticated,
        user,
        login,
        register,
        logout,
        updateUserRole,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
