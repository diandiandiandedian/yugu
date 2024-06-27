import pool from '../../db/db';
import Cors from 'cors';


function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        });
}

// 初始化 CORS 中间件
const corsMiddleware = initMiddleware(
    Cors({
        origin: '*', // 允许所有来源，根据需要进行更精确的配置
        methods: ['GET', 'POST', 'OPTIONS'], // 允许的 HTTP 方法
    })
);

export default async function handler(req, res) {
    await corsMiddleware(req, res);
    console.log('req', req.method)
    switch (req.method) {
        case 'GET':
            return queryUserHavePullCoupon(req, res);
        case 'POST':
            return updateUserGetCoupon(req, res);
        // 添加其它方法的处理逻辑（PUT、DELETE）
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const queryUserHavePullCoupon = async (req, res) => {
    // const { address } = req.body;
    const {address} = req.query;
    // const { address3 } = req.json
    console.log('address11111', address)
    try {
        const rows = await queryUserHavePullCouponSql(address)
        console.log('rows', rows[0])
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

async function queryUserHavePullCouponSql(address) {
    const rows = await pool.query('SELECT * FROM soon_coupon where pull_address = ?', [address]);
    return rows
}

async function updateRestCoupon() {
    const result = await pool.execute('UPDATE coupon SET coupon_count = coupon_count -1 WHERE id = 1 and coupon_count>0 ');
    // pool.end();
    console.log('修改结果', result)
    return result
}


//todo 地址要改
async function queryUserNFTs(address, collection) {
    let url = "https://testnet.tonapi.io/v2/accounts/" + address + "/nfts?collection=" + collection + "&limit=1000&offset=0&indirect_ownership=false"
    const res = await fetch(url)
    const data = await res.json()
    return data.nft_items
}


const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // 允许的 HTTP 方法
    origin: '*', // 允许的来源，或者根据实际情况设置具体的来源
});

// todo 测试合约: kQCosUQKgQvPvf-WQtvYoL25e-7VY7Wll6zrdC81DT9NZ7S0
// todo 正式合约: EQBcBMxM4DOJzxgN8KG_Qm8WOgwTbDCxApyTFVduT_8lz1Yl
const updateUserGetCoupon = async (req, res) => {
    const {address} = req.body;
    try {
        const userNftList = await queryUserNFTs(address, 'kQCosUQKgQvPvf-WQtvYoL25e-7VY7Wll6zrdC81DT9NZ7S0')
        if (userNftList.length <= 0) {
            res.status(200).json({"status": 334, "errorMsg": "dont have nft"});
            return
        }
        const userNFTs = await queryUserHavePullCouponSql(address)
        console.log('userNFTs', userNFTs, userNFTs[0].length)
        if (userNFTs[0] !== undefined && userNFTs[0].length > 0) {
            res.status(200).json({"status": 333, "errorMsg": "user have pull coupon"});
            return
        }
        // console.log('address', data, address)

        const updateResult = await updateRestCoupon()
        console.log('updateResult[0]', updateResult[0].affectedRows)
        if (updateResult[0].affectedRows >= 1) {
            const [result] = await pool.execute('INSERT INTO `ezswap`.`soon_coupon` (`create_time`, `coupon`, `pull_address`) VALUES (?, ?, ?)', [new Date().getTime(), 1, address]);
        }
        // pool.end();
        res.status(201).json({"status": 0});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
