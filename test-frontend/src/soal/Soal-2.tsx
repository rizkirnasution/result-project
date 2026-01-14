import { useState } from "react";
const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: ""
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let isValid = false;
        const newErrors = { name: "", email: "" };

        if (!name) {
            newErrors.name = "Nama tidak boleh kosong";
            isValid = true;
        }

        if (!email.includes("@")) {
            newErrors.email = "Email tidak valid";
            isValid = true;
        }

        setFormErrors(newErrors)
        if (isValid) return;

        alert("Form Berhasil Submit!")
    }

    return (
        <div
            style={{
                backgroundColor: "#4988C4",
                padding: "16px",
                borderRadius: "6px",
                maxWidth: "400px",
                border: "1px solid #ddd",
                textAlign: "left",
            }}
        >
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ marginBottom: "5px" }}>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                            border: "none"
                        }}
                    />

                    {formErrors.name && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                            {formErrors.name}
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ marginBottom: "5px" }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                            border: "none"
                        }}
                    />
                    {formErrors.email && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                            {formErrors.email}
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#213448",
                            color: "#fff",
                            padding: "6px 16px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Submit
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ContactForm;