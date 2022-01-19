import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BeaverNFTAbi } from './BeaverNFTAbi';

interface BeaverNFT {
  tokenId: string
  image: string,
  traits: Record<string, number>
}

function App() {
  const [address, setAddress] = useState('');
  const [ntfs, setNfts] = useState<BeaverNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const isValid = Web3.utils.isAddress(address);

  useEffect(() => {
    if (isValid) {
      const fetchData = async () => {

        const web3 = new Web3("https://rinkeby.infura.io/v3/d4ed4c25a40645bd95f4d33bc7cd0925");
        const contract = new web3.eth.Contract(BeaverNFTAbi as any, "0xDe35f2734A04e641C4766683Bd321fC9EC7Aed1a");

        const balance = await contract.methods.balanceOf(address).call();

        const newNfts: BeaverNFT[] = [];
        for (let ix = 0; ix < balance; ix++) {
          const tokenId = await contract.methods.tokenOfOwnerByIndex(address, ix).call();
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          const metadataResponse = await fetch(tokenURI);
          const metadata = await metadataResponse.json();
          console.log(metadata);

          const traits: Record<string, number> = {};

          for (const attribute of metadata.attributes) {
            traits[attribute.trait_type] = attribute.value;
          }

          newNfts.push({
            tokenId,
            image: metadata.image,
            traits,
          })
        }


        setNfts(newNfts)
        setLoading(false);
      }
      fetchData();
    }
  }, [address, isValid])


  return (
    <div className="container">
      <h1 className='mt-3'>Our cool Beaver NFT viewer</h1>
      <label>Address of the user ... that has alllll the NFTs</label>
      <input type="text"
        className={`form-control ${isValid ? '' : 'is-invalid'}`}
        value={address}
        onChange={e => setAddress(e.target.value)}
      />

      {isValid && <div className='mt-5'>
        <h3>These are all the cool NFTs</h3>

        {loading
          ? <p className='text-muted'>Loading ...</p>
          : <div>
            <p className='text-muted'>The address <span className='text-primary'>{address}</span> has <span className='text-primary'>{ntfs.length}</span> NFTs</p>
            <div className='row'>
              {ntfs.map(nft => <div className='col-4 border'>
                <h5>#{nft.tokenId}</h5>
                <img src={nft.image} alt='beaver' className='w-100' />

                <div className='row'>
                  <div className='col'>
                    H: {nft.traits.Hardworking}
                  </div>
                  <div className='col'>
                    E: {nft.traits.Efficient}
                  </div>
                </div>
              </div>)}
            </div>
          </div>}
      </div>}

    </div>
  );
}

export default App;
