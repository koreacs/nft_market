import  { useEffect } from 'react';
import NavbarLast from '../../layouts/Head/NavbarLast';
import SecHeadContact from './SecHeadContact';
import CardForm from './CardForm';
import { handleTitle } from '../../utils';
import $ from 'jquery';





function onKeyUpChk(){

  let inputName = $("#inputName").val().trim();
  let inputEmail = $("#inputEmail").val().trim();
  //let contactTxt = $("#contactTxt").val().trim();
  let nameChk = false;
  let emailChk = false;
  //let contentChk = false;
  let txtLen = $("#contactTxt").val()?.toString().length;
  
  $('#txtCount').html(""+txtLen+"/500");


  if(inputName === ''){
    nameChk = true;
  }
  
  if(inputEmail === '' ){
    emailChk = true;
  }else if(!email_check(inputEmail)){
    emailChk = true;
  }


  if(!nameChk && !emailChk){
    $(".btnArea>a").addClass("on");
  }else{
    $(".btnArea>a").removeClass("on");
  }

}

function email_check(email) {

	var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	return reg.test(email);

}



const ContactContainer = () => {

  const sendMessage = () =>{
    
    let inputName = $("#inputName").val().trim();
    let inputEmail = $("#inputEmail").val().trim();
    let contactTxt = $("#contactTxt").val().trim();
    let txtLen = $("#contactTxt").val()?.toString().length;
    let nameChk = false;
    let emailChk = false;


    if(inputName !== ''){
      $('.contactusPage>.content>.step1>span').hide();
    }else if(inputName === ''){
      $('.contactusPage>.content>.step1>span').show();
      nameChk = true;
    }
    
    if(inputEmail === '' ){
      $('.contactusPage>.content>.step2>span').text('Please enter your name');
      $('.contactusPage>.content>.step2>span').show(); 
      emailChk = true;
    }else if(!email_check(inputEmail)){
      $('.contactusPage>.content>.step2>span').text('Please enter a valid email format');
      $('.contactusPage>.content>.step2>span').show(); 
      emailChk = true;
    }else if(inputEmail !== ''){
      $('.contactusPage>.content>.step2>span').hide();
    }
    

    
  
    if (txtLen > 500) {
      $("#contactTxt").val($("#contactTxt").val().substring(0,800));
      $('#txtCount').html("500/500");
      $(".contactusPage>.content>.inputbox.step3").addClass('error');
    } else if (txtLen <= 500) {
      $(".contactusPage>.content>.inputbox.step3").removeClass('error');
    }

    if($(".btnArea>a").hasClass('on')){
      var param = 'mailto:support@pando-nft.com?subject='+inputName+"&body="+contactTxt + "%0D%0A%0D%0A%0D%0APlease return '"+inputEmail+"'";

      window.open(param);  
    }else{
      if(inputName === ''){
        $('.contactusPage>.content>.step1>span').text('Please enter your name');
        $('.contactusPage>.content>.step1>span').show();
      }
      
      if(inputEmail === ''){
        $('.contactusPage>.content>.step2>span').show();
      }
  
    }

    if(!nameChk && !emailChk){
      $(".btnArea>a").addClass("on");
    }else{
      $(".btnArea>a").removeClass("on");
    }
    
  }

  useEffect(() => {
    // handleTitle('Contact');
    handleTitle('MNB-NFT');
  }, []);

  return (

    <div className="contactusPage">
      <div className="contactusBG"></div>
      <div className="content">
        <p className="tit">Need any help?</p>

        <div className="inputbox step1">
          <p>Full name*</p>
          <div className="inputArea">
            <input type="text" id="inputName" onKeyUp={onKeyUpChk} placeholder="Enter your name"/>
          </div>
          <span className="err">Please enter your name</span>
        </div>
        
        <div className="inputbox step2">
          <p>Email*</p>
          <div className="inputArea">
            <input type="text" id="inputEmail" onKeyUp={onKeyUpChk} placeholder="Enter your email"/>
          </div>
          <span className="err">Please enter your email</span>
        </div>
        
        <div className="inputbox step3">
          <p>Message*</p>
          <div className="txtArea">
            <textarea name="" id="contactTxt" onKeyUp={()=>{onKeyUpChk();}} placeholder="Let us know how we can help you!"></textarea>
            <span id="txtCount">0/500</span>
          </div>
          <span className="err">Please enter within 500 characters.</span>
        </div>
        
        <div className="btnArea">
          <a href="#" onClick={sendMessage} className="">SEND MESSAGE</a>
        </div>
      </div>
    </div>

  );
};

export default ContactContainer;