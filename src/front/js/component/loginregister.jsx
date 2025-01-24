import React from "react";



export const LoginRegister = () => {
    return(
        <div className="container mt-5">
            <h3 className="text-left" style={{ color: "#4a148c", paddingLeft: "200px" }}>Login</h3>
            <div className="card p-3 shadow-sm" style={{  backgroundColor: "rgba(111, 76, 176, 0.33)", borderRadius: "21px", maxWidth: "550px", margin: "0 auto" }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="julian@mediagenda.com" style={{ fontSize: "14px", padding: "8px", backgroundColor: "#e5d1f8", border: "1px solid #3E2F9C", borderRadius: "8px" }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="password" style={{ fontSize: "14px", padding: "8px", backgroundColor: "#e5d1f8", border: "1px solid #3E2F9C", borderRadius: "8px" }} />
                    </div>
                    <div className="mb-3">
                        <div className="d-flex justify-content-end">
                            <a href="/forgot-password" className="text-decoration-none" style={{ color: "#4a148c", fontSize: "12px" }}>
                                Have you forgotten your password?
                            </a>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary d-flex justify-content-center" style={{ backgroundColor: "#4a148c", padding: "8px", fontSize: "18px", borderRadius: "20px", width: "35%" }}>Log in</button>
                    <p className="text-center mt-3">
                        <small>
                            If you are not registered you can <a href="https://studious-computing-machine-v6g54v55jp693pj6r-3000.app.github.dev/register" className="text-danger" style={{ fontSize: "12px" }}>register here</a>.
                        </small>
                    </p>
                </form>
            </div>
        </div>
    );
}