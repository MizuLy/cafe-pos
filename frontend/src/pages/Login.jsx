export default function Login() {
  return (
    <div className="mx-auto">
      <form>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Enter your email" />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter your password" />
      </form>
    </div>
  );
}
