# Nexlance SaaS Auth - Quick Reference Guide

## ⚡ Quick Start

### 1. Use Protected Actions
```javascript
// In any component that gets handleProtectedAction prop
function handleAction() {
  handleProtectedAction(() => {
    navigate('/dashboard');
  });
}
```

### 2. Check Auth Status
```javascript
// In Navbar to show different buttons
{isLoggedIn ? (
  <button onClick={onLogout}>Logout</button>
) : (
  <button onClick={() => openModal('login')}>Sign In</button>
)}
```

### 3. Open Auth Modal
```javascript
// For direct login prompt
openModal('login');   // Show login form
openModal('register'); // Show register form
```

---

## 🎯 Public vs Protected Actions

### PUBLIC (Direct Navigation)
✅ Search services
✅ Browse categories
✅ View category page
✅ Browse all categories

```javascript
function handleCategoryClick(categoryName) {
  navigate(`/services?category=${categoryName}`);
}
```

### PROTECTED (Requires Login)
🔐 Generate project brief
🔐 Start selling
🔐 Access dashboard
🔐 Place order
🔐 View profile

```javascript
function handleGenerateBrief() {
  handleProtectedAction(() => {
    navigate('/create-project');
  });
}
```

---

## 📋 Updated Components

### App.jsx
- Added: `isLoggedIn`, `authMode`, `pendingAction` state
- Added: `handleProtectedAction()`, `handleLoginSuccess()`, `handleLogout()`
- All props passed to components

### AuthModal.jsx
- Added: `onLoginSuccess` callback
- Added: `pendingAction` display message
- Login form now calls `onLoginSuccess()`

### Navbar.jsx
- Added: `isLoggedIn`, `onLogout`, `handleProtectedAction` props
- Shows "Dashboard" & "Logout" when logged in
- Shows "Sign In" & "Get Started" when not logged in
- "Start Selling" is protected action

### HeroSection.jsx
- Added: `handleProtectedAction` prop
- Search is public action

### CTASection.jsx
- Added: `handleProtectedAction` prop
- "Generate Brief" is protected action

### CategoriesMenu.jsx
- Added: `handleProtectedAction` prop
- Category clicks are public actions

### PopularCategories.jsx
- Added: `handleProtectedAction` prop
- Category clicks are public actions
- "Browse all" is public action

---

## 🔄 Flow Diagram

```
USER JOURNEY
============

Guest Landing
├── Browse freely (no login needed)
├── Click category → See services
├── Search services → Direct result
└── Try protected action → Auth modal opens

Auth Modal Flow
├── "Please sign in to continue" message
├── Fill login form
├── Submit → onLoginSuccess() called
├── isLoggedIn = true
├── Modal closes
└── Pending action executes (redirect to page)

Authenticated User
├── Dashboard button in navbar
├── All protected actions work immediately
├── Logout button available
└── Can browse and act freely
```

---

## 🚀 To Enable Backend

### Replace Demo Alert
```javascript
// In AuthModal.jsx LoginForm handleSubmit
- alert('Logged in (demo)');
+ try {
+   const response = await fetch('/api/login', {
+     method: 'POST',
+     headers: { 'Content-Type': 'application/json' },
+     body: JSON.stringify({ email, password })
+   });
+   const data = await response.json();
+   if (data.token) {
+     localStorage.setItem('auth_token', data.token);
+     onLoginSuccess();
+   }
+ } catch (error) {
+   setErrors({ form: error.message });
+ }
```

### Persist Auth
```javascript
// In App.jsx
useEffect(() => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    setIsLoggedIn(true);
  }
}, []);

function handleLogout() {
  setIsLoggedIn(false);
  localStorage.removeItem('auth_token');
}
```

### Add Protected Routes
```javascript
// In main.jsx
function ProtectedRoute({ children }) {
  if (!isLoggedIn) return <Navigate to="/" />;
  return children;
}

<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

---

## ✅ Tested Features

- [x] Guest browsing (no login required)
- [x] Protected actions trigger modal
- [x] Auth modal shows pending action message
- [x] Login success executes pending action
- [x] Navbar shows correct buttons based on auth state
- [x] Logout clears auth state
- [x] All components receive proper props
- [x] No syntax errors

---

## 📊 Auth State Structure

```javascript
App.jsx State:
├── isLoggedIn: false (initially)
├── isAuthOpen: false (initially)
├── authMode: 'login' | 'register'
├── pendingAction: () => void (callback)

Props Down:
├── Navbar: { openModal, isLoggedIn, onLogout, handleProtectedAction }
├── HeroSection: { handleProtectedAction }
├── CategoriesMenu: { handleProtectedAction }
├── PopularCategories: { handleProtectedAction }
├── CTASection: { handleProtectedAction }
└── AuthModal: { isOpen, mode, onClose, onModeChange, onLoginSuccess, pendingAction }
```

---

## 🎨 Design Patterns Used

**Pattern 1: Conditional Button Rendering**
```javascript
{isLoggedIn ? <Button>Logout</Button> : <Button>Sign In</Button>}
```

**Pattern 2: Protected Action Wrapper**
```javascript
function handleProtectedAction(action) {
  if (!isLoggedIn) {
    setPendingAction(() => action);
    openAuthModal();
  } else {
    action();
  }
}
```

**Pattern 3: Callback Chain**
```
User Action → handleProtectedAction() → If not logged in → Store action
User Login → onLoginSuccess() → Execute stored action → Redirect
```

---

## 💡 Best Practices

✅ DO:
- Use `handleProtectedAction()` for login-required actions
- Direct navigation for browsing (public)
- Check `isLoggedIn` in Navbar conditionally
- Store pending action and execute after login
- Show user why login is needed

❌ DON'T:
- Force login for browsing categories
- Use alerts for login flow
- Redirect without storing pending action
- Hard-code auth checks in components
- Mix auth logic with UI components

---

## 📚 File Reference

**Authentication Logic:**
- `src/App.jsx` - Auth state, handlers

**Auth UI:**
- `src/components/AuthModal.jsx` - Login/register forms

**Components Using Auth:**
- `src/components/Navbar.jsx`
- `src/components/HeroSection.jsx`
- `src/components/CTASection.jsx`
- `src/components/CategoriesMenu.jsx`
- `src/components/PopularCategories.jsx`

**Documentation:**
- `AUTHENTICATION_FLOW.md` - Detailed guide
- `QUICK_REFERENCE.md` - This file

---

## 🔗 Integration Points

When adding new features:

1. **New Protected Feature?**
   ```javascript
   function handleFeature() {
     handleProtectedAction(() => navigate('/feature-page'));
   }
   ```

2. **Public Browsing Feature?**
   ```javascript
   function handleFeature() {
     navigate('/feature-page'); // No auth check
   }
   ```

3. **New Component?**
   ```javascript
   // Accept props from App
   export default function NewComponent({ 
     handleProtectedAction 
   }) { ... }
   
   // Pass in App.jsx
   <NewComponent handleProtectedAction={handleProtectedAction} />
   ```

---

## 🎯 Next Actions

1. ✅ Basic auth flow complete
2. 🚀 Connect to backend API
3. 🚀 Add localStorage persistence
4. 🚀 Implement protected routes
5. 🚀 Add user profile management
6. 🚀 Add OAuth (Google/GitHub)

---

**All components are ready for production backend integration!**
