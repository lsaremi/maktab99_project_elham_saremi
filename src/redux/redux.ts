// ///////////////////////////////////////////////////////////

// ; import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ; interface User {
// ;   id: number;
// ;   firstName: string;
// ;   lastName: string;
// ;   email: string;
// ;   password: string;
// isAdmin: boolean;
// ; }

// ; interface UserState {
// ;   users: User[];
// ; }

// ; const initialState: UserState = {
// ;   users: [],
// ; };

// ; const userSlice = createSlice({
// ;   name: 'user',
// ;   initialState,
// ;   reducers: {
// ;     addUser(state, action: PayloadAction<User>) {
// ;       state.users.push(action.payload);
// ;     },
// ;   },
// ; });

// ; export const { addUser } = userSlice.actions;

// ; export default userSlice.reducer;

// //////////////////////////////////////////////////////

// ; import { configureStore } from '@reduxjs/toolkit';
// ; import userReducer from './userSlice';

// ; const store = configureStore({
// ;   reducer: {
// ;     user: userReducer,
// ;   },
// ; });

// ; export default store;

// /////////////////////////////////////////////////

// ; import React, { useState } from 'react';
// ; import { useDispatch } from 'react-redux';
// ; import { addUser } from '../redux/userSlice';

// ; const Signup = () => {
// ;   const dispatch = useDispatch();
// ;   const [firstName, setFirstName] = useState('');
// ;   const [lastName, setLastName] = useState('');
// ;   const [email, setEmail] = useState('');
// ;   const [password, setPassword] = useState('');

// ;   const handleSubmit = (e) => {
// ;     e.preventDefault();
// ;     const newUser = {
// ;       id: Math.random(), // به عنوان مثال از یک آیدی تصادفی استفاده می‌کنیم
// ;       firstName,
// ;       lastName,
// ;       email,
// ;       password,
// ;     };
// ;     dispatch(addUser(newUser));
// ;     // پس از اضافه شدن کاربر، می‌توانید اطلاعات فرم را ریست کنید
// ;     setFirstName('');
// ;     setLastName('');
// ;     setEmail('');
// ;     setPassword('');
// ;   };

// ;   return (
// ;     <div>
// ;       <h2>ثبت نام</h2>
// ;       <form onSubmit={handleSubmit}>
// ;         <input type="text" placeholder="نام" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
// ;         <input type="text" placeholder="نام خانوادگی" value={lastName} onChange={(e) => setLastName(e.target.value)} />
// ;         <input type="email" placeholder="ایمیل" value={email} onChange={(e) => setEmail(e.target.value)} />
// ;         <input type="password" placeholder="رمز عبور" value={password} onChange={(e) => setPassword(e.target.value)} />
// ;         <button type="submit">ثبت نام</button>
// ;       </form>
// ;     </div>
// ;   );
// ; };

// ; export default Signup;

// User
// حالا یه صفحه ای بساز که لیست کاربرانی که ادد شدنرو نشون بده و فقط توسط ادمین مشاهده بشه
// یعنی حتما رولش admin باشه که بتونه ببیندش
// ChatGPT
// برای ایجاد یک صفحه که فقط توسط ادمین قابل مشاهده باشد و لیست کاربران را نمایش دهد، می‌توانید از Redux Toolkit و React استفاده کنید. این صفحه به دسترسی به استیت Redux و بررسی رول کاربر ادمین برای نمایش اطلاعات نیاز دارد. در اینجا مراحل ایجاد این صفحه را برای شما نشان می‌دهم:

// Redux Slice برای مدیریت لیست کاربران:

// ابتدا یک reducer در Redux Toolkit برای مدیریت لیست کاربران ایجاد کنید:

// javascript
// Copy code
// // userSlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   isAdmin: boolean;
// }

// interface UserState {
//   users: User[];
// }

// const initialState: UserState = {
//   users: [],
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     addUser(state, action: PayloadAction<User>) {
//       state.users.push(action.payload);
//     },
//   },
// });

// export const { addUser } = userSlice.actions;

// export default userSlice.reducer;
// ایجاد یک صفحه React برای نمایش لیست کاربران:

// سپس، یک کامپوننت React برای نمایش لیست کاربران ایجاد کنید. در این کامپوننت، با استفاده از useSelector اطلاعات کاربران را از استیت Redux بخوانید و لیست را نمایش دهید. همچنین، از رول کاربر برای بررسی اینکه آیا کاربر ادمین است یا خیر استفاده کنید:

// javascript
// Copy code
// // UserListPage.tsx

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';

// const UserListPage = () => {
//   const users = useSelector((state: RootState) => state.user.users);
//   const isAdmin = useSelector((state: RootState) => state.auth.isAdmin); // فرضا که اطلاعات رول کاربر در استیت auth است

//   return (
//     <div>
//       <h2>لیست کاربران</h2>
//       <ul>
//         {isAdmin && users.map(user => (
//           <li key={user.id}>
//             {user.firstName} {user.lastName} - {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserListPage;
// محدود کردن دسترسی به صفحه:

// حالا باید اطمینان حاصل کنید که فقط کاربران با رول ادمین به این صفحه دسترسی دارند. می‌توانید این کار را با استفاده از یک میان‌افزار (middleware) یا یک کامپوننت محافظت کننده انجام دهید. به عنوان مثال، اگر از React Router استفاده می‌کنید، می‌توانید یک کامپوننت محافظت کننده برای این صفحه ایجاد کنید که کاربر را به صفحه لاگین هدایت کند اگر رول او ادمین نباشد.

// مثالی از کامپوننت محافظت کننده:

// javascript
// Copy code
// // AdminRouteGuard.tsx

// import React from 'react';
// import { Redirect, Route, RouteProps } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';

// interface AdminRouteProps extends RouteProps {
//   component: React.ComponentType<any>;
// }

// const AdminRouteGuard: React.FC<AdminRouteProps> = ({ component: Component, ...rest }) => {
//   const isAdmin = useSelector((state: RootState) => state.auth.isAdmin); // فرضا که اطلاعات رول کاربر در استیت auth است

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAdmin ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default AdminRouteGuard;
// سپس این کامپوننت را در فایل Route های مربوطه به صفحه UserListPage استفاده کنید:

// javascript
// Copy code
// // App.tsx

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import AdminRouteGuard from './AdminRouteGuard';
// import UserListPage from './User
// User
// ادامه اش
// ChatGPT
// javascript
// Copy code
// // App.tsx

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import AdminRouteGuard from './AdminRouteGuard';
// import UserListPage from './UserListPage';
// import LoginPage from './LoginPage'; // شما باید صفحه لاگین را ایجاد کنید
// import SignupPage from './SignupPage'; // شما باید صفحه ثبت نام را ایجاد کنید

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Switch>
//           <Route path="/login" component={LoginPage} />
//           <Route path="/signup" component={SignupPage} />
//           <AdminRouteGuard path="/users" component={UserListPage} />
//           {/* سایر مسیرها */}
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
// با این تغییرات، اکنون صفحه لیست کاربران فقط برای کاربران با رول ادمین قابل دسترسی است و در غیر اینصورت کاربر به صفحه لاگین هدایت می‌شود. حالا می‌توانید با استفاده از اکشن‌ها و reducerهای Redux Toolkit کاربران را اضافه کرده و در لیست نمایش دهید.
