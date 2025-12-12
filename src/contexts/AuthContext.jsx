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

    // Check if user is logged in on app start
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
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
                            console.warn('Profile fetch error:', profileError);
                        }

                        setUser({
                            id: session.user.id,
                            name: profile?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                            email: session.user.email,
                            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
                            role: profile?.role || 'student'  // Default to student if role column missing
                        });
                    } catch (fetchError) {
                        console.warn('Using fallback user data:', fetchError);
                        // Use fallback data without profile
                        setUser({
                            id: session.user.id,
                            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                            email: session.user.email,
                            avatar: session.user.user_metadata?.avatar_url || null,
                            role: 'student'  // Default to student on error
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
                            console.warn('Profile fetch error:', profileError);
                        }

                        setUser({
                            id: session.user.id,
                            name: profile?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                            email: session.user.email,
                            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
                            role: profile?.role || 'student'
                        });
                    } catch (fetchError) {
                        console.warn('Using fallback user data:', fetchError);
                        setUser({
                            id: session.user.id,
                            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                            email: session.user.email,
                            avatar: session.user.user_metadata?.avatar_url || null,
                            role: 'student'
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
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        }
    };

    const value = {
        isAuthenticated,
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
