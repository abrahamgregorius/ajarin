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
        const checkAuthStatus = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    // Get stored role as fallback
                    const storedRole = getStoredRole(session.user.id);

                    // Fetch user profile to get role with timeout protection
                    const profilePromise = supabase
                        .from('profiles')
                        .select('role, full_name, avatar_url')
                        .eq('id', session.user.id)
                        .single();

                    // Set a 10-second timeout
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Profile fetch timeout')), 10000)
                    );

                    try {
                        const { data: profile, error: profileError } = await Promise.race([
                            profilePromise,
                            timeoutPromise
                        ]);

                        if (profileError) {
                            console.warn('Profile fetch error, using stored role:', profileError);
                        }

                        const userRole = profile?.role || storedRole;

                        // Store the role for future use
                        storeRole(session.user.id, userRole);

                        setUser({
                            id: session.user.id,
                            name: profile?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                            email: session.user.email,
                            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
                            role: userRole
                        });
                    } catch (fetchError) {
                        console.warn('Using stored role due to fetch error:', fetchError);
                        // Use stored role as fallback
                        setUser({
                            id: session.user.id,
                            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                            email: session.user.email,
                            avatar: session.user.user_metadata?.avatar_url || null,
                            role: storedRole
                        });
                    }

                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    // Get stored role as fallback
                    const storedRole = getStoredRole(session.user.id);

                    // Fetch user profile to get role with timeout protection
                    const profilePromise = supabase
                        .from('profiles')
                        .select('role, full_name, avatar_url')
                        .eq('id', session.user.id)
                        .single();

                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Profile fetch timeout')), 10000)
                    );

                    try {
                        const { data: profile, error: profileError } = await Promise.race([
                            profilePromise,
                            timeoutPromise
                        ]);

                        if (profileError) {
                            console.warn('Profile fetch error, using stored role:', profileError);
                        }

                        const userRole = profile?.role || storedRole;

                        // Store the role for future use
                        storeRole(session.user.id, userRole);

                        setUser({
                            id: session.user.id,
                            name: profile?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                            email: session.user.email,
                            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
                            role: userRole
                        });
                    } catch (fetchError) {
                        console.warn('Using stored role due to fetch error:', fetchError);
                        // Use stored role as fallback
                        setUser({
                            id: session.user.id,
                            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                            email: session.user.email,
                            avatar: session.user.user_metadata?.avatar_url || null,
                            role: storedRole
                        });
                    }

                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    };

    const register = async (userData) => {
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
            throw new Error(error.message);
        }

        // Note: Profile will be created automatically by the database trigger
        // No need to manually create it here since upsert handles both create and update

        return data;
    };

    const logout = async () => {
        // Clear stored role on logout
        if (user?.id) {
            try {
                localStorage.removeItem(`user_role_${user.id}`);
            } catch (error) {
                console.warn('Failed to clear role from localStorage:', error);
            }
        }

        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        }
    };

    // Function to manually update user role (useful for admin role changes)
    const updateUserRole = async (newRole) => {
        if (!user?.id) return;

        try {
            // Update in database
            const { error } = await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', user.id);

            if (error) {
                console.error('Error updating role in database:', error);
                return;
            }

            // Update in localStorage
            storeRole(user.id, newRole);

            // Update in state
            setUser(prev => prev ? { ...prev, role: newRole } : null);

            console.log('Role updated successfully:', newRole);
        } catch (error) {
            console.error('Error updating user role:', error);
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
