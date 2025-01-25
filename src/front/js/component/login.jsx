import React from "react";

export const Login = () => {
    return (
        <>
        <div className="row">
        <div className="col-6 mb-3">
        <h3 className="login-title">Login</h3>
        </div>
        </div>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="login-container">
                
                <div className="card p-3 shadow-sm login-card">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input 
                                type="email" 
                                className="form-control email-input" 
                                id="email" 
                                placeholder="example@mediagenda.com" 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input 
                                type="password" 
                                className="form-control password-input" 
                                id="password" 
                                placeholder="password" 
                            />
                        </div>
                        <div className="mb-3 text-end">
                            <a href="/forgot-password" className="forgot-password-link">
                                Have you forgotten your password?
                            </a>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary login-button">
                            Log in
                        </button>
                        <p className="text-center mt-3">
                            <spam>
                                If you are not registered you can  
                                <a 
                                    href="https://congenial-capybara-v6g54v55jgp5hxqr7-3000.app.github.dev/register" 
                                    className="register-link">
                                    register here
                                </a>.
                            </spam>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

