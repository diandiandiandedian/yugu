import pool from '../../db/db';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getUsers(req, res);
        case 'POST':
            return addUser(req, res);
        // 添加其它方法的处理逻辑（PUT、DELETE）
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM yugu_account');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addUser = async (req, res) => {
    const { email, password, address, create_time } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO yugu_account (email, password,address,create_time,is_del) VALUES (?, ?,?,?,?)', [email, password, address, create_time, 0]);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
