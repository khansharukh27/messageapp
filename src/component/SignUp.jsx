import { useState } from 'react';
import '../componentcss/signup.css'
import manAvtar from './image folder/manAvtar.svg';
import cellPhone from './image folder/cellPhone.svg';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [signUpInput, setSignUpInput] = useState({
    Name: '',
    PhoneNumber: '',
    Email: '',
    Password: '',
    // ProfilePic: null,

  });
  const [errorMessage, setErrorMessage] = useState('');

  // const [ProfilePic,setProfilePic] = useState(null)
// const [previewimg,setPreviewimg] = useState('');

const navigate = useNavigate()
  const handleChange = (e) => {
   const {name,value} =e.target;
   setSignUpInput({
    ...signUpInput,
    [name]:value
   })
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpInput),
      });
      if(response.ok){
       setSignUpInput('')
       navigate('/loging')
       alert('successfully saved data in database')
       console.log('signUpInput',signUpInput)
      }
      const errorData = await response.json();
      setErrorMessage(errorData.message);
      // Handle response as needed
    } catch (error) {
      console.error('Error:', error);

    }
  };


const handleRoute = (e) =>{
  navigate('/loging')
}

  return (
    <form className="form_container" onSubmit={handleSubmit}>
      <div className="logo_container"></div>
      <div className="title_container">
        <p className="title">Login to your Account</p>
        <span className="subtitle">Get started with our app, just create an account and enjoy the experience.</span>
      </div>
      <br />
      {/* <div className='input_container'>
      <label className="input_label" htmlFor="profile pic">Profile pic</label>
      <input placeholder="profile pic" title="Input title" name="ProfilePic" onChange={handleChange} type="file" className="input_pic" id="ProfilePic" accept='image/*'/>
      {previewimg && <img src={previewimg} alt='preview img' className='input_prev'/>}      
      </div> */}
      <div className="input_container">
        <label className="input_label" htmlFor="Name">Name</label>
        <img src={manAvtar} alt="manAvtar" className="icon" height="24" width="24" />
        <input placeholder="name" title="Input title" name="Name" value={signUpInput.Name} onChange={handleChange} type="text" className="input_field" id="Name" />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="PhoneNumber">Phone Number</label>
        <img src={cellPhone} alt="cellphone" className="icon" height="24" width="24" />
        <input placeholder="PhoneNumber" title="Input title" name="PhoneNumber" value={signUpInput.PhoneNumber} onChange={handleChange} type="text" className="input_field" id="PhoneNumber" />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="Email">Email</label>
        <input placeholder="name@mail.com" title="Inpit title" name="Email" value={signUpInput.Email} onChange={handleChange} type="text" className="input_field" id="Email" />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="Password">Password</label>
        <input placeholder="Password" title="Inpit title" name="Password" value={signUpInput.Password} onChange={handleChange} type="password" className="input_field" id="Password" />
      </div>
      <div className='input_container'>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      </div>
      <button title="Sign In" type="submit" className="sign-in_btn">
        <span>Sign In</span>
      </button>
      <div>
        <button type='button' className='sign-in_btn' onClick={handleRoute}>I have allready an acount</button>
      </div>

      <div className="separator">
        <hr className="line" />
        <span>Or</span>
        <hr className="line" />
      </div>
      <button title="Sign In" type="submit" className="sign-in_ggl">
        <img src={manAvtar} alt="manAvtar" className="icon" height="24" width="24" />
        <span>Sign In with Google</span>
      </button>
      <button title="Sign In" type="submit" className="sign-in_apl">
        <svg preserveAspectRatio="xMidYMid" version="1.1" viewBox="0 0 256 315" height="20px" width="16px" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fill="#ffffff" d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249"></path>
          </g>
        </svg>
        <span>Sign In with Apple</span>
      </button>
      <p className="note">Terms of use &amp; Conditions</p>
    </form>
  );
};

export default SignUp;
