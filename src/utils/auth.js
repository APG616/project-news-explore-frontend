const AUTH_URL = "https://se-register-api.en.tripleten-services.com/v1";

class Auth {
   static async signup(email, password, username) {
    try {
      // Validaciones (se mantienen igual)
      if (!email?.trim()) throw new Error("El email es requerido");
      if (!password?.trim()) throw new Error("La contraseña es requerida");
      if (!username?.trim()) throw new Error("El nombre de usuario es requerido");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("El formato del email no es válido");
      if (password.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres");

      const response = await fetch(`${AUTH_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          username: username.trim()
        })
      });

      const responseData = await response.json();
      console.log('Signup API Response:', responseData);

      if (!response.ok) {
        // Manejo de errores (se mantiene igual)
        let errorMessage = "Error en el registro";
        // ... (código existente de manejo de errores)
        throw new Error(errorMessage);
      }

      // Extracción CORREGIDA de userData
    const userData = {
      email: responseData.data?.email || email.trim(),
      username: username.trim(), // Siempre usar el username del formulario
      _id: responseData.data?._id,
      ...responseData.data
    };

      if (responseData.token) {
        localStorage.setItem("jwt", responseData.token);
        // Guardar también en localStorage para persistencia
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new CustomEvent('auth-change', {
          detail: { user: userData }
        }));
      }

      return { 
        success: true,
        token: responseData.token,
        user: userData
      };
      
    } catch (error) {
      console.error("Error en registro:", error);
      throw error.message 
        ? error 
        : new Error("Error de conexión. Por favor intenta nuevamente.");
    }
  }

  static async signin(email, password) {
    try {
      if (!email?.trim() || !password?.trim()) {
        throw new Error("Email y password son requeridos");
      }

      const response = await fetch(`${AUTH_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password.trim() 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciales inválidas. Verifica tu email y contraseña.");
        }
        throw new Error(data.message || `Error en el servidor (${response.status})`);
      }

      if (!data.token) {
        throw new Error("La autenticación falló: no se recibió token");
      }

      const userData = {
        email: data.data?.email || email.trim(),
        username: data.data?.username || '',
        ...(data.data || data.user || {})
      };

      localStorage.setItem("jwt", data.token);
      window.dispatchEvent(new CustomEvent('auth-change', {
        detail: { user: userData }
      }));
      
      return {
        ...data,
        user: userData
      };
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('jwt');
    window.dispatchEvent(new Event('auth-change'));
  }

static async checkToken() {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) return null;
    
    const response = await fetch(`${AUTH_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Token verification failed');
    
    const responseData = await response.json();
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    
    return {
      email: responseData.data?.email || storedUser.email || '',
      username: storedUser.username || '', // Priorizar el username guardado
      _id: responseData.data?._id,
      ...responseData.data
    };
  } catch (error) {
    this.logout();
    throw error;
  }
}

  static async checkEmailExists(email) {
    try {
      const response = await fetch(`${AUTH_URL}/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.trim() })
      });
      
      const data = await response.json();
      return data.exists || false;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  }
}

export default Auth;