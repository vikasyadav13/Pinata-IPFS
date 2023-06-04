import React, { useState } from 'react';
import axios from 'axios';

const REACT_APP_PINATA_API_KEY = '3d1339e240cc29a201c9';
const REACT_APP_PINATA_API_SECRET = '0092f8afccc699c6fb7c9f855442e2a35b031e42ab607ccedf7440661511833b';

const App = () => {
  const [fileImg, setFileImg] = useState(null);

  const sendFileToIPFS = async (e) => {
    e.preventDefault(); 
    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append('file', fileImg);

        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: REACT_APP_PINATA_API_SECRET,
            'Content-Type': 'multipart/form-data',
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        // Take a look at your Pinata Pinned section, you will see a new file added to your list.

      } catch (error) {
        console.log('Error sending File to IPFS:');
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={sendFileToIPFS}>
      <input type="file" onChange={(e) => setFileImg(e.target.files[0])} required />
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default App;
