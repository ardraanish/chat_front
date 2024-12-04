import { useState } from 'react';

function UseModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

    

  return {
    
    isOpen, open, close ,username,password,email,setPassword,setEmail,setUsername

};
}

export default UseModal;
