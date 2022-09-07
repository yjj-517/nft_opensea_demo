//NFT管理的api接口统一管理
import axios from './index.js'
import Qs from "qs";
//获取所有信息 + 查询 +分页
export async function getLists(params) {
    let { data } = await axios.get('/api/v1/nfts?' + Qs.stringify(params))
    return data
}
//单个和批量删除
export async function deleteNft(params) {
    return await axios.post('/api/v1/nfts/delete', params)
}
// 修改NFT详情
export async function changeNFT(id, params) {
    return await axios.put('/api/v1/nfts/' + id, params)
}
// 新建Nft
export async function upload(params) {
    return await axios.post('/api/v1/nfts', params)
}
//从对象存储批量获取NFT
export async function uploadBatch(params) {
    return await axios.post('/api/v1/nfts/batch', params)
}

//获取对象存储中的文件上传到打包上传 ipfs
export async function uploadIpfs(params) {
    return await axios.put('/api/v1/nfts/ipfs/batch', Qs.stringify(params))
}

//单个和批量设置NFT为待Mint
export async function uploadWait(params) {
    return await axios.put('/api/v1/nfts/mint/wait', Qs.stringify(params))
}
// 批量 Mint NFT
export async function uploadMint(params) {
    return await axios.put('/api/v1/nfts/mint', Qs.stringify(params))
}



