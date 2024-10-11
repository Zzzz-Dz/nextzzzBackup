const OSS = require("ali-oss");

export async function GET() {
  
  return new Response('Hello, World!',{status:200,headers:{"Content-Type":"text/plain"}})

  // 方法二
  try {
    const array = new Array()
    const getResultList = await client.list({prefix:"Image/"});
    const result = new Map(Object.entries(getResultList))
    const result_objects = result.get('objects')
    for (let i of result_objects){
      array.push(decodeURIComponent(i.url).split('/').at(-1))
    }
    const ArrayWorks = [['pictrueName'],['worksName','upName','uploadDate']]
    const worksData = array.map((data) => data.split('@').map((data)=>data.split('_')))
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          // 生成一个0到i之间的随机索引
          const j = Math.floor(Math.random() * (i + 1));
          // 交换当前元素与随机索引处的元素
          [array[i], array[j]] = [array[j], array[i]];
        }
      return array;
    }  
    const shuffledArray = shuffleArray([...worksData]); 
    const results = shuffledArray.map((data) => {
      let array2 = new Object();
      data.forEach((value,i) => {
          value.forEach((v,index) => {  
              array2[ArrayWorks[i][index]] = v
          })
      })
      return array2
    })

    return new Response(JSON.stringify({ worksData: results }),{status:200,headers:{'Content-Type':'application/json'}})
  } catch (error) {
    console.error('发生错误:', error);
    throw new Error('Api Error')
  }
}
