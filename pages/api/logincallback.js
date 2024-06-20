import pool from '../../db/db';
import {console} from "next/dist/compiled/@edge-runtime/primitives";

export default async function handler(req, res) {
    console.log('我进来了')

    // console.log('body',body)
    console.log('res',req.body)
    // window.location.replace("https://www.runoob.com");
    // res.location('https://www.oecom.cn/api/post');
    res.redirect(302, `/?credential=${req.body.credential}`);  // 第一个参数是HTTP状态码，302表示临时重定向


}

