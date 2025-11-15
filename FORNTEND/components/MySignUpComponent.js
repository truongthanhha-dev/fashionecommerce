// components/MySignUpComponent.js

import { useSignUp } from "@clerk/nextjs";

const MySignUpComponent = () => {
  const { signUp, isLoaded } = useSignUp();

  const handleUserSignup = async (email, password) => {
    try {
      // Gọi Clerk để đăng ký người dùng
      const signUpResponse = await signUp.create({ email, password });
      await signUp.prepareEmailAddressVerification(); // Xác minh email (nếu cần)
      await signUp.waitForVerification(); // Chờ xác minh nếu cần

      // Sau khi đăng ký thành công, gọi API để lưu người dùng vào MongoDB
      const response = await fetch('/api/saveUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        console.log('User saved successfully!');
      } else {
        console.error('Error saving user:', response.statusText);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      handleUserSignup(email, password);
    }}>
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default MySignUpComponent;
