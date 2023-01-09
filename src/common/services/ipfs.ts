// import { Asset } from '@models/entities/asset.entity';
import { create as createIpfs } from 'ipfs-http-client';
import { env } from '@env';
import IpfsInterface from '@interfaces/ipfs.interface';
import { Service } from 'typedi';

@Service()
class Ipfs {
  private ipfsClient;
  private baseUrl;

  constructor(
    ipfsClient = createIpfs({ url: `${env.app.ipfsUrl}/api/v0` }),
    baseUrl = env.app.ipfsUrl,
  ) {
    this.ipfsClient = ipfsClient;
    this.baseUrl = baseUrl;
  }

  async uploadMetadata(data: IpfsInterface) {
    try {
      const metadata = {
        name: data.name,
        description: data.description,
        image: data.image,
        attributes: JSON.parse(data.metadata),
      };
      const { cid } = await this.ipfsClient.add(JSON.stringify(metadata));
      const ipfs = `${this.baseUrl}/ipfs/${cid}`;
      return ipfs;
    } catch (error) {
      throw new Error("Can't upload metadata");
    }
  }
}

export default Ipfs;
