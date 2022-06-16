import Input from './Input';
import { create } from 'ipfs-http-client';
import { useDropzone } from 'react-dropzone';
import React from 'react';
import { useRecoilValue } from 'recoil';
import walletAccountAtom from '../../../atoms/walletAccount';
import myPointAtom from '../../../atoms/myPoint';
import Textarea from './Textarea';
import NFTCollection from '../../../abis/NFT.json';
import contracts from '../../../constants/contracts';
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import web3 from '../../../connection/web3';
import { AbiItem } from 'web3-utils';
import createItemCategoryAtom from '../../../atoms/createItemCategory';
const projectId = "ace3b880ffb643a9b3db09719d89c3bd"
const projectSecret = "dd2c87bc49904ed5b77b8819e6d93e49"
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

// host: 'rinkeby.infura.io',
// path: '/v3/ace3b880ffb643a9b3db09719d89c3bd',
// method: 'POST',
// protocol: 'https',
// auth: projectId + ':' + projectSecret

const CardForm = ({ data }: { data: any }) => {
  const walletAccount = useRecoilValue(walletAccountAtom);

  const [capturedFileBuffer, setCapturedFileBuffer] =
    React.useState<Buffer | null>(null);
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [ipfsImage, setIpfsImage] = React.useState<string>('');
  const [agree, setAgree] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const createItemCategory = useRecoilValue(createItemCategoryAtom);

  const onDrop = React.useCallback((files: any) => {
    setBuffer(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const captureFile: React.ChangeEventHandler<HTMLInputElement> = (
    event: any
  ) => {
    event.preventDefault();

    const file = event.target.files[0];

    setBuffer(file);
  };

  const setBuffer = (file: any) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      // @ts-ignore
      setCapturedFileBuffer(Buffer(reader.result));
    };
  };

  const onSubmit = async () => {
    if (!capturedFileBuffer) {
      console.log('!capturedFileBuffer');
      return;
    }

    if (!title) {
      alert('Item Title is required!');
      return;
    }
    if (!description) {
      alert('Item Description is required!');
      return;
    }

    setIsLoading(true);
    console.log("capturedFileBuffer :::", capturedFileBuffer)
    const fileAdded = await ipfs.add(capturedFileBuffer);
    console.log("fileAdded :::", fileAdded)
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
          description: createItemCategory,
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

    await contracts.nftContract.methods
      .mintNFT(metadataAdded.path)
      .send({ from: walletAccount });

    setCapturedFileBuffer(null);
    setTitle('');
    setDescription('');
    setAgree(false);
    setIsLoading(false);
    alert('NFT Created!');
  };

  return (
    <div className="card-body">
      <form>
        <div className="mt-2 position-relative">
          <p className="text-sm font-weight-bold mb-15 text-secondary text-border d-inline z-index-2 bg-white">
            Upload File
          </p>
        </div>
        <div className="upload-div" {...getRootProps()}>
          {capturedFileBuffer ? (
            <img
              src={`data:image/png;base64,${capturedFileBuffer.toString(
                'base64'
              )}`}
              style={{ maxWidth: '100%' }}
            />
          ) : (
            <button className="btn btn-outline-primary btn-sm mb-0">
              {isDragActive ? 'Drop the files here ...' : 'Upload Item File'}
            </button>
          )}
          <input
            type="file"
            name="upload"
            id="upload-btn"
            required
            onChange={captureFile}
            {...getInputProps()}
          />
        </div>

        <Input
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* <div className="form-check form-check-info text-left">
          <input
            id="agree"
            className="form-check-input"
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label htmlFor="agree" className="form-check-label">
            Transfer Copyright When Purchased?
          </label>
        </div> */}
        <div className="text-center">
          <button
            disabled={isLoading}
            type="button"
            className="btn bg-gradient-dark w-100 my-4 mb-2"
            onClick={onSubmit}
          >
            List Item Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
