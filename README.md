# 📰 News Explorer - Frontend Implementation

![News Explorer Screenshot](./images/news-explorer-screenshot.png)

React frontend implementation for the News Explorer application featuring user authentication, article search, and saved articles management.


## 🔑 Key Features

### Authentication Flow
- JWT token storage in `localStorage`
- Protected routes using `ProtectedRoute` HOC
- Form validation for login/registration
- Context API for user state management

// ProtectedRoute implementation
const ProtectedRoute = ({ children, loggedIn }) => {
  return loggedIn ? children : <Navigate to="/" />;
};

Article Management

    Search functionality with pagination ("Show more" button)

    Save/delete articles with visual feedback

    Preloader during API requests

    Empty state handling ("No results found")


// Article card component
function NewsCard({ article, isLoggedIn, onSave, onDelete }) {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    if (!isLoggedIn) {
      openLoginPopup();
      return;
    }
    onSave(article);
    setIsSaved(true);
  };

  return (
    <div className="card">
      <img src={article.image} alt={article.title} />
      <button 
        className={`card__save-button ${isSaved ? 'card__save-button_active' : ''}`}
        onClick={isSaved ? () => onDelete(article._id) : handleSave}
      />
    </div>
  );
}

🎨 UI Components
Responsive Header

    Dynamic state based on authentication:

        "Sign in" button when logged out

        "Saved articles" link + "Log out" when logged in

    Mobile menu for smaller screens

Popup System

    Login/registration forms

    Form validation with disabled submit buttons

    Success/error messages

    Smooth open/close animations

⚙️ Technical Implementation
State Management

    CurrentUserContext for global user data

    Custom hooks for API requests

    Local storage persistence


// API service module
export const getSavedArticles = (token) => {
  return fetch(`${BASE_URL}/articles`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(checkResponse)
  .catch(err => {
    console.error('Failed to fetch articles:', err);
    throw err;
  });
};

Performance Optimizations

    Memoized components with React.memo

    Efficient event listener cleanup

    Lazy loading for non-critical components

    Optimized image assets

📝 Code Quality Standards
Naming Conventions

    camelCase for variables and functions

    Component names start with uppercase (PascalCase)

    Descriptive names (no abbreviations)

    Custom hooks prefixed with use

Best Practices

    Semantic HTML structure

    BEM methodology for CSS

    No third-party libraries except React Router

    Clean component lifecycle management

    Proper error boundaries

🛠 Development Setup

    Clone the repository:


git clone https://github.com/yourusername/news-explorer-frontend.git

    Install dependencies:

npm install

    Start development server:

npm start

    Build for production:


npm run build

Developed as part of TripleTen's Web Development program
