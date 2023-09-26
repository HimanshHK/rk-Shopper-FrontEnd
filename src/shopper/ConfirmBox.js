import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const confirmRoot = document.createElement("div");
const body = document.querySelector("body");
body?.appendChild(confirmRoot);

function ConfirmDialog({ title, text, giveAnswer, options }) {
  return (
    <Dialog
      open
      disableBackdropClick
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => giveAnswer(false)} color="primary">
          {options && options.falseButtonText ? options.falseButtonText : "Disagree"}
        </Button>
        <Button onClick={() => giveAnswer(true)} color="primary" autoFocus>
          {options && options.trueButtonText ? options.trueButtonText : "Agree"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const customConfirm = ({ text, title, options }) =>
  new Promise((res) => {
    const giveAnswer = (answer) => {
      ReactDOM.unmountComponentAtNode(confirmRoot);
      res(answer);
    };

    ReactDOM.render(
      <ConfirmDialog title={title} text={text} giveAnswer={giveAnswer} options={options} />,
      confirmRoot
    );
  });

const CustomComponent = () => {
  const handleClick = async () => {
    const answer = await customConfirm({
      text: "Are you positive you actually clicked this button?",
      title: "Are you okay?",
      options: {
        trueButtonText: "Uhm, yeah",
        falseButtonText: "Hell nawh",
      },
    });
    console.log("User's answer:", answer);
  };

  const myStyle={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100vh',
    padding:'0 20px'
  }

  return (
    <div style={myStyle}>
      <div onClick={handleClick}>Open Confirmation Dialog</div>
    </div>
  );
};

export default CustomComponent;
