import { ref, computed } from 'vue';
import { authService, userService } from '../services/storage';

const currentUser = ref(authService.getCurrentUser());

export function useAuth() {
  const isLoggedIn = computed(() => currentUser.value !== null);
  const isAdmin = computed(() => currentUser.value?.role === 'admin');
  const isUser = computed(() => currentUser.value?.role === 'user');
  
  const login = async (email, password) => {
    const user = authService.login(email, password);
    if (user) {
      currentUser.value = user;
      return { success: true, user };
    }
    return { success: false, error: 'Invalid email or password' };
  };
  
  const logout = () => {
    authService.logout();
    currentUser.value = null;
  };
  
  const register = async (userData) => {
    try {
      // Check if email already exists
      const existingUser = userService.getByEmail(userData.email);
      if (existingUser) {
        return { success: false, error: 'Email already exists' };
      }
      
      // Create new user
      const newUser = userService.create({
        ...userData,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`
      });
      
      // Auto-login
      const { password: _, ...userWithoutPassword } = newUser;
      currentUser.value = userWithoutPassword;
      authService.login(userData.email, userData.password);
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const updateProfile = (userData) => {
    if (!currentUser.value) return { success: false, error: 'Not authenticated' };
    
    const updated = userService.update(currentUser.value.id, userData);
    if (updated) {
      const { password: _, ...userWithoutPassword } = updated;
      currentUser.value = userWithoutPassword;
      localStorage.setItem('course_platform_auth', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Update failed' };
  };
  
  return {
    currentUser: computed(() => currentUser.value),
    isLoggedIn,
    isAdmin,
    isUser,
    login,
    logout,
    register,
    updateProfile
  };
}
