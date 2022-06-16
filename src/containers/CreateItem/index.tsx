import React,{ useEffect , useState, useRef} from 'react';
import $ from 'jquery';
import { getMainWidth, handleTitle } from '../../utils';
import './CreateItem.css';
import mnu2 from '../../assets/img/mnu2.png';
import mnu3 from '../../assets/img/mnu3.png';
import mnu4 from '../../assets/img/mnu4.png';
import mnu5 from '../../assets/img/mnu5.png';
import mnu6 from '../../assets/img/mnu6.png';
import mnu7 from '../../assets/img/mnu7.png';
import mnu8 from '../../assets/img/mnu8.png';
import btn_close from '../../assets/img/btn_close.png';
import upload from '../../assets/img/upload.png';
import walletAccountAtom from '../../atoms/walletAccount';
import myPointAtom from '../../atoms/myPoint';
import { useRecoilValue } from 'recoil';
import createItemCategoryAtom from '../../atoms/createItemCategory';
import contracts from '../../constants/contracts';
import { create } from 'ipfs-http-client';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import addresses from '../../constants/addresses';


// host: 'rinkeby.infura.io',
// protocol: 'https',
// path: '/v3/ace3b880ffb643a9b3db09719d89c3bd',
// method: 'POST',
// auth: 'ace3b880ffb643a9b3db09719d89c3bd:dd2c87bc49904ed5b77b8819e6d93e49'
const ipfs = create({
  host: 'ipfs.infura.io',
  // https://rinkeby.infura.io/v3/ace3b880ffb643a9b3db09719d89c3bd
  // path: '/v3/ace3b880ffb643a9b3db09719d89c3bd',
  port: 5001,
  protocol: 'https',
  // auth: 'ace3b880ffb643a9b3db09719d89c3bd:dd2c87bc49904ed5b77b8819e6d93e49'
});



const CreateItemContainer = () => {

  const history = useHistory();
  const walletAccount = useRecoilValue(walletAccountAtom);
  const [capturedFileBuffer, setCapturedFileBuffer] = React.useState<Buffer | null>(null);

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [nftLink, setNftLink] = React.useState<string>('');

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [agree, setAgree] = React.useState<boolean>(false);
  const [itemCategory, setItemCategory] = React.useState<Number>(1);
  const createItemCategory = useRecoilValue(createItemCategoryAtom);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadFile,setUploadFile] = useState(null);


  const captureFile: React.ChangeEventHandler<HTMLInputElement> = (
    event: any
  ) => {
    event.preventDefault();

    const file = event.target.files[0];

    setBuffer(file);
    setUploadFile(file);
  };

  const setBuffer = (file: any) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      // @ts-ignore

      if (file) {

        var maxSize = 100 * 1024 * 1024;
        var fileSize = file.size;

        if (fileSize > maxSize) {
          alert("Attachments can be registered within 100 MB.");
          setCapturedFileBuffer(null);
          return false;
        }
      }

      if ($(":input[name='u_file']").val() == '') {
        $('#imgArea').attr('src', '');
        $(".cont1").addClass("error");
      }else{
        $(".cont1").removeClass("error");
      }
      $('#imgViewArea').css({
        'display' : 'block'
      });      
      $('.fileBtn').css({
        'display' : 'none'
      });

      setCapturedFileBuffer(Buffer(reader.result));
    };
  };

  // 이미지 에러 시 미리보기영역 미노출
  const imgAreaError = async () =>  {
    $('#imgViewArea').css({
      'display' : 'none'
    });
    $('.fileBtn').css({
      'display' : 'block'
    });

    if ($(":input[name='u_file']").val() == '') {
      $('#imgArea').attr('src', '');
      $(".cont1").addClass("error");
    }else{
      $(".cont1").removeClass("error");
    }

  }

  // 이미지 삭제 및 초기화
  const imgresetFn = async () => {
    $('#u_file').val('');
    $('#imgArea').attr('src', '');
    $('#imgViewArea').css({
      'display' : 'none'
    });
    $('.fileBtn').css({
      'display' : 'block'
    });
    

    if ($(":input[name='u_file']").val() == '') {
      $('#imgArea').attr('src', '');
      $(".cont1").addClass("error");
    }else{
      $(".cont1").removeClass("error");
    }

    setCapturedFileBuffer(null);
  }

  

  $('.inputArea>input').on('keyup', function() {
    if(!title){
      $(".cont2").addClass("error");
    }else{
      $(".cont2").removeClass("error");
    }
  });

  $('#crenftTxt').on('keyup', function() {
    var txtLen = $('#crenftTxt').val()?.toString().length;
    $('#descripCount').html("" + txtLen + "/800");
    // $('#descripCount').html(""+$(this).val().length+"/800");
  
    if (txtLen > 800) {
      $('#crenftTxt').val($('#crenftTxt').val()?.toString().substring(0, 800));
      $('#descripCount').html("800/800");
  
    } else if (txtLen == 800) {
      $('#descripCount').css({
        "color" : "#f00"
      });
  
    } else {
      $('#descripCount').css({
        "color" : "#AFB5C7"
      });
  
    }
  });


  const onSubmit = async () => {

    !capturedFileBuffer ? $('.cont1>span').show() : $('.cont1>span').hide();
    !title ? $('.cont2>span').show() : $('.cont2>span').hide();
    $(".createnftPage>.contents>.cont4").hasClass("error") ? $('.cont4>div>p').show() : $('.cont4>div>p').hide();



    if (!capturedFileBuffer) {
      console.log('!capturedFileBuffer');
      return;
    }

    if (!title) {
      alert('Item Title is required!');
      return;
    }

    /**
    if (!description) {
      alert('Item Description is required!');
      return;
    }
    */

    if($(".createnftPage>.contents>.cont4").hasClass("error")){
      alert("Please Select a category")
      return;
    }

    setIsLoading(true);
    console.log("capturedFileBuffer :::", capturedFileBuffer);
    const fileAdded = await ipfs.add(capturedFileBuffer);
    console.log("fileAdded :::", fileAdded);

    const metadata = {
      title: 'Asset Metadata',
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: title,
        },
        description: {
          type: 'string',
          description: description,
        },
        image: {
          type: 'string',
          description: fileAdded.path,
        },
        category: {
          type: 'number',
          description: itemCategory,
        },
      },
    };

    
    const metadataAdded = await ipfs.add(JSON.stringify(metadata));
    if (!metadataAdded) {
      console.error('Something went wrong when updloading the file');
      return;
    }

    console.log('metadataAdded');
    console.log(metadataAdded);
    console.log(walletAccount);
 
    try{
      await contracts.nftContract.methods
      .mintNFT(metadataAdded.path)
      .send({ from: walletAccount });

      //setTitle('');
      //setDescription('');
      setAgree(false);
      setIsLoading(false);
      $(".nftcreateconfPop").show();

    }catch(e){
      setIsLoading(false);
      console.log(e);
    }
    //setCapturedFileBuffer(null);
  };


  const categoryFn = event => {

    event.preventDefault();

    event.currentTarget.className = event.currentTarget.className === "" || event.currentTarget.className ==="off" ? "on" : "off";

    let cateChk = false;
    $('.createnftPage>.contents>.cont4>.selectArea>ul>li').each(function (index, item) { 
      if( $(item).hasClass('on') ){
        cateChk = true;
        if($(item).attr('id') === event.currentTarget.id){
          setItemCategory(index+1);
        }else{
          $(item).removeClass('on');
        }
        //return false;
      }
    });


    if(cateChk){
      $(".createnftPage>.contents>.cont4").removeClass("error");
    }else{
      $(".createnftPage>.contents>.cont4").addClass("error");
    }
    

  }

  //get
  /*
  const createNftFromDB = async () => {


    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    

    setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.

  }
  */

  //post
  async function createNftFromDB() {
    try {

      var formData = new FormData();
      formData.append('file',uploadFile);
      formData.append('title',title);
      formData.append('description',description);
      formData.append('address',walletAccount);
      formData.append('category',itemCategory);
      formData.append('nftLink',nftLink)
      

      var config = {
        method: 'post',
        url: addresses.targetIp+'/nft/create',
        headers: { 
          'Accept': 'multipart/form-data', 
          'Content-Type': 'multipart/form-data'
        },
        data : formData
      };

      for(let key of formData.entries()){
          console.log({key});
      }
      
      axios(config).then(function (response) {

        var jsonData = JSON.parse(JSON.stringify(response.data));

        if(jsonData.code === 'OK'){
          $(".nftcreateconfPop").show();
        }else{
          alert('생성실패!');
        }


      })
      .catch(function (error) {
        console.log(error);
      });

      //응답 성공 
      //console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }


  useEffect(() => {
    // document.title = 'CreateItem'
    // handleTitle('CreateItem');
    handleTitle('MNB-NFT');
    getMainWidth();


    setError(null);
    setUsers(null);
    // loading 상태를 true 로 바꿉니다.
    setLoading(true);
    
  }, []);



  return (
    <>

			<div className="createnftPage">
				<div className="contents">
					<h2>Create NFT</h2>
					<div className="cont1 error">
						<p className="tit">Upload file*</p>
						<p className="subtit">Choose your file to upload.</p>
						<div className="fileupArea">
						  <input  type="file" id="u_file" name="u_file" accept=".JPG, .PNG, .GIF, .SVG, .MP4, .WAV, .OGG, .GLB, .GLTF" onChange={captureFile} hidden/>
                <label className="fileBtn" htmlFor="u_file"> <img src={upload} alt=""/></label>
							<p className="acceptfile fileBtn">JPG, PNG, GIF, SVG, MP4, WAV, OGG, GLB,
								GLTF. Max Size: 100mb</p>
							<div id="imgViewArea">
								<span className="frame"> 
                  <a href="#" className="clse" onClick={imgresetFn}>
                    <img src={btn_close} alt=""/>
                  </a> 
                  {capturedFileBuffer ? (
                                        <img id="imgArea" onError={imgAreaError}
                                          src={`data:image/png;base64,${capturedFileBuffer.toString(
                                            'base64'
                                          )}`}
                                          style={{ maxWidth: '100%' }}
                                        />
                                      ) : (
                                        <img id="imgArea" alt=""/>
                                      )}
								</span>
							</div>
						</div>
						<span className="err" style={{ display: "none" }}>Please upload a file</span>
					</div>

					<div className="cont2 error">
						<p className="tit">Title*</p>
						<div className="inputArea">
							<input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Enter your NFT title"/>
						</div>
						<span className="err" style={{ display: "none" }} >Please enter a title</span>
					</div>

					<div className="cont3">
						<p className="tit">Description</p>
						<div className="txtArea">
							<textarea name="" onChange={(e) => setDescription(e.target.value)} id="crenftTxt" placeholder="Describe your NFT"></textarea>
							<span id="descripCount">0/800</span>
						</div>
					</div>

          <div className="cont2">
						<p className="tit">Link</p>
						<div className="inputArea" onChange={(e) => setNftLink(e.target.value)}>
							<input type="text" id='nftLink'/>
						</div>
					</div>

					<div className="cont4 error">
						<p className="tit">Select Category*</p>
						<p className="subtit">Select at least one category</p>
						<div className="selectArea">
							<ul className="clearfix">
								<li id='LiRef1' onClick={categoryFn}><a href="#none" ><span className="frame"><img
											src={mnu4} alt=""/></span> Diamond</a></li>
								<li id='LiRef2' onClick={categoryFn}><a href="#none"><span className="frame"><img
											src={mnu2} alt=""/></span> Artwork</a></li>
								<li id='LiRef3' onClick={categoryFn}><a href="#none" ><span className="frame"><img
											src={mnu5} alt=""/></span> Digital Art</a></li>
							</ul>
							<p className="err" style={{ display: "none" }}>Select a category.</p>
						</div>
					</div>

					<div className="btnArea">
						<a href="#none" className={isLoading?"off":"on"}  onClick={createNftFromDB}  >CREATE</a>
					</div>
				</div>
			</div>

      <div className="nftcreateconfPop">
        <div className="shadow"></div>
        <div className="contArea">
          <div className="txtArea">
            <p>Your NFT has been</p>
            <p>successfully created!</p>
          </div>
          <span className="frame">
             {capturedFileBuffer ? (
                                        <img  onError={imgAreaError}
                                          src={`data:image/png;base64,${capturedFileBuffer.toString(
                                            'base64'
                                          )}`}
                                          style={{ maxWidth: '100%' }}
                                        />
                                      ) : (
                                        <img  alt=""/>
                                      )}
          </span>
          <p className="nftTit">
            🎉 You just created <span>{title}</span>
          </p>
          <div className="btnArea">
            <a href="#" onClick={() => {$(".nftcreateconfPop").hide(); setCapturedFileBuffer(null); history.push('/mycollection');}}>CONFIRM</a>
          </div>
        </div>
      </div>

    </>
  );
};

export default CreateItemContainer;
