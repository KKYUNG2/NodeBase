/**
 * Created by 유희찬 on 2020-07-16.
 */

import mariadb from "mariadb";

import MariaDBLoader from "../engineLoader/MariaDB";

class MariaDB {

    private cluster: any;

    constructor() {
        this.cluster = mariadb.createPoolCluster({removeNodeErrorCount: 5, restoreNodeTimeout: 5000});
    }

    public getCluster() {
        return this.cluster;
    };

    async getConnection() {
        try {

            await MariaDBLoader();
            return await this.cluster.getConnection();

        } catch (err) {
            console.log(err);
            this.cluster.end();

        }
    };

    async query(statement: string) {
        let conn = await this.getConnection();

        try {
            let result = await conn.query(statement.trim());

            await conn.commit();
            await conn.release();

            return {
                affectedRows: result.affectedRows
            };

        } catch (err) {
            await conn.release();
            return null;

        }

    }

    async getOne(statement: string) {
        let conn = await this.getConnection();

        try {
            let result = await conn.query(statement.trim());

            await conn.commit();
            await conn.release();

            return {
                affectedRows: result.affectedRows
            };

        } catch (err) {
            await conn.release();
            return null;

        }

    }

    async get(statement: string) {
        let conn = await this.getConnection();

        try {
            let result = await conn.query(statement.trim());

            await conn.commit();
            await conn.release();

            return {
                affectedRows: result.affectedRows
            };

        } catch (err) {
            await conn.release();
            return null;

        }

    }

}

export default new MariaDB();
