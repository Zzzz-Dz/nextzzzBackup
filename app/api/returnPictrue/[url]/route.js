import OSS from "ali-oss"

export async function GET(request, { params }) {
  const client = new OSS({
    region: "oss-cn-hangzhou",
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    // 填写Bucket名称。
    bucket: "nextappzzz"
  });
  
  const url = decodeURI(params.url);
  
  // 方法一
  // const url = client.signatureUrl("/Image/1.txt", {
  //   method: "PUT",
  //   "Content-Type": "application/x-www-form-urlencoded",
  // });
  // const file = fs.readFileSync("D:\\1.txt");
  // const response = await axios({
  //   url,
  //   method: "PUT",
  //   data: file,
  // })
  //   .then((r) => {console.log(r)})
  //   .catch((e) => console.log(e));

  //   // 上传文件到OSS，'object'是OSS中的文件名，'localfile'是本地文件的路径。
  // const uploadResult = await client.put('/Image/eatYanami@static&worksFile@吃零食的老八_zzz_9-26.jpg', 'D:\\GitHub repository\\firstProject\\newObjectForReact\\public\\static\\worksFile\\eatYanami@static&worksFile@吃零食的老八_zzz_9-26.jpg');
  // const result = new Map(Object.entries(uploadResult));
  
  
  // 从OSS下载文件以验证上传成功。
  const getResult = await client.get(`/Image/${url}`);
  const buffer = new Map(Object.entries(getResult)).get('content')
  // let image = "data:image/png;base64," + btoa(new Uint8Array(buffer).reduce(async (res, byte) => {return res + String.fromCharCode(byte), ''}))
  return new Response(buffer,{status:200,headers:{'Content-Type':'image/png'}})
}
