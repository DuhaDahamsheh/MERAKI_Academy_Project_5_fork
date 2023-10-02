import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./style.css";
import { setInfo } from "../../service/redux/reducers/provider_info";

const Info = () => {
  // ============================common states=================================
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch=useDispatch()
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const[img,setImg]=useState("")
  const[bio,setBio]=useState("")
  const[qua,setQua]=useState("")


  const { providerId, token } = useSelector((state) => {
  return {
    providerId:state.auth.providerId,
    token:state.auth.token,
 
  }
}

  );
  

  // ============================common states=================================

  // ======================first modal states and functions================


  const [url, setUrl] = useState("");

  const insert_info = (urlFile) => {
    axios
      .post(
        `http://localhost:5000/provider_info`,
        {
          bio: bio || "",
          qualifications: qua || "",
          img: urlFile || "",
          provider_id: providerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(setInfo( {
         bio ,
        qua ,
       urlFile, 
       providerId,
        },))
        setMsg({ success: true, msg: result.data.message });
      })
      .catch((err) => {
        setMsg({ success: false, msg: err.result.data.message });
      });
  };
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "g9fkkaot");
    data.append("cloud_name", "drzcyo3sv");
    axios
      .post("https:api.cloudinary.com/v1_1/drzcyo3sv/image/upload", data)
      .then((res) => {
       console.log("url:",res.data.url);
        insert_info(res.data.url);
        setUrl(res.data.url);
      })
      .catch((err) => console.log(err));
  };
  // ======================first modal states and functions================

  // ======================second modal states and functions================


 

  // ======================second modal states and functions================

  return (
    <>
      <div className="welcome">
        Welcome to our team . Please follow the steps to setup your account
      </div>
      
        {/* ============================start of first modal==================================================*/}
        <div className="step"> 
         <label>
          1.
          <Button variant="primary" onClick={handleShow}>
            Insert info
          </Button>
        </label>
</div>
<div className="input_container">
        <Modal show={show} onHide={handleClose}>
          <div className="inputs">
          <Modal.Body>
            <InputGroup>
              <InputGroup.Text>Bio</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Bio"
                autoFocus
                onChange={(e) => {
                  setBio(e.target.value)
                  ;
                }}
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>Qualifications</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Qualifications"
                autoFocus
                onChange={(e) => {
                  setQua(e.target.value)
                  ;
                }}
              />
            </InputGroup>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Insert your image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                setImg(e.target.files[0])
                  
                }}
              />
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                as="input"
                type="submit"
                value="Submit"
                onClick={() => {
               console.log(img);
                  if (img) {
                    uploadImage();
                  } else {
                    insert_info();
                  }
                }}
              />
             {msg&& <p className={`${msg.success ? "pass" : "fail"}`}>{msg.msg}</p>}
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal> 

        {/* ============================end of first modal==================================================*/}

      </div>
    </>
  );
};

export default Info;

//
//
