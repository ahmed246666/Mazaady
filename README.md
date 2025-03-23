# Task Report: Frontend Developer Task Assignment (Next.js)

## Overview
This project implements a form with searchable dropdown menus, replicates a static page design, and ensures clean, efficient code using **Next.js**, **TypeScript**, **Shadcn** , **Axios** , **Jest** , **React Testing library** and **TailwindCSS**. It includes reusable components, accessibility improvements, and unit tests.

---

## Demo Ui Link : https://mazaady-nextjs.vercel.app/ 

## Demo Form Link : https://mazaady-nextjs.vercel.app/form 
### Note : (main category : cars , sub category :text input ) are good data to test the form as they aren't empty 

## Key Features
1. **Navbar**:
   - Split into reusable components: `NavLinks`, `NavActions`, `LanguageSelector`, `NavbarMenu`.
   - Added `role` and `aria-label` for accessibility.

2. **Collapsable**:
   - Split into reusable components: `ToggleButton`, `InfoBanner`, `QRCodeSection`.
   - Improved accessibility with `role` and `aria-label`.

3. **ProfileCard**:
   - Split into reusable components: `ProfileImage`, `StatCard`.
   - Enhanced accessibility with `role` and `aria-label`.

4. **useCountdown Hook**:
   - Custom hook for countdown functionality.

5. **ProductsTab**:
   - Split into reusable components: `ProductsHeader`, `ProductItem`, `ProductImage`, `ProductBadge`, `ProductDetails`, `LotStartsIn`, `CountdownBadge`, `FavoriteIcon`.

6. **Form**:
   - Two searchable dropdown menus: Main Category and Subcategory.
   - Hierarchical property relationships (e.g., Brand → Model → Type).
   - "Other" option with custom input field.
   - Displays selected key-value pairs in a table on submission.

7. **Testing**:
   - Unit tests for `Navbar`, `Collapsable`, `ProfileCard`, `QRCodeSection`.
   - Hook test for `useCountdown`.
    
8. **Fully Responsive And Pixelperfect Ui Implementation**

---

## Best Practices
- **Separation of Concerns**: Components split into smaller, reusable parts.
- **Reusability**: DRY principles followed.
- **Accessibility**: `role` and `aria-label` added.
- **Performance**: `useCallback` used for event handlers.
- **Testing**: Comprehensive unit tests implemented.
