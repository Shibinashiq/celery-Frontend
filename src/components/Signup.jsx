import React, { useState } from 'react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("sign-up");
  const [formData, setFormData] = useState({
    username: '', // Updated from 'name' to 'username'
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/User/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/login'); 
      } else {
        const data = await response.json();

        console.error('Signup failed:', data);
      }
    } catch (error) {
      console.error('Error occurred while signing up:', error);
    }
  }
  

  const handleLoginUpClick = () => {
    navigate('/login');
  }

  return (
    <div className="flex flex-col w-full items-center mt-10">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Signup">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your Name"
                  type="text"
                  name="username" // Updated from 'name' to 'username'
                  value={formData.username} // Updated from 'name' to 'username'
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={formData.email}
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
                  Already have an account{" "}
                  <Link size="sm" onClick={handleLoginUpClick} className="cursor-pointer">
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Signup
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

export default Signup;
