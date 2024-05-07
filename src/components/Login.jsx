import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../Redux/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/User/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        dispatch(loginSuccess(data));
        if (data.is_superuser) {
          navigate("/Admin"); 
        } else {
          navigate("/"); 
        }
      } else {
        window.alert("Login failed:");
        dispatch(loginFailure(data.error));
      }
    } catch (error) {
      window.alert("Error occurred while logging in:");
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col w-full items-center mt-10">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey="login"
            onSelectionChange={() => {}}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <Input
                  isRequired
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link
                    size="sm"
                    onClick={handleSignUpClick}
                    className="cursor-pointer"
                  >
                    Sign up
                  </Link>
                </p>
                <div className="flex justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
