/**
 * Created by 유희찬 on 2020-07-16.
 */

import mariadb from "mariadb";
import Logger from '../modules/Logger'

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
            Logger.debug('Query Insert Fail', err);
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

            return result[0];

        } catch (err) {
            Logger.debug('Query Select Fail', err);
            await conn.release();
            return null;

        }

    }


    async get(statement: string[]) {
        let conn = await this.getConnection();

        try {
            await conn.beginTransaction();

            let query = statement.join(" ; ");
            let result = await conn.query(query);

            if (result.length !== statement.length) {
                throw new Error("Miss match query count! - Injection attack warning");
            }

            Logger.debug("Query result - " + (!!result));
            Logger.debug(query);

            await conn.commit();
            await conn.release();

            return result;

        } catch (err) {
            await conn.rollback();
            Logger.debug('Query Execute Fail', err);
        }
    }

    async Execute(statement: string) {
        let conn = await this.getConnection();

        try {
            let result = await conn.query(statement.trim());

            await conn.commit();
            await conn.release();

            return {
                affectedRows: result.affectedRows,
                insertId: result.insertId
            };

        } catch (err) {
            await conn.release();
            return null;

        }

    }

}

export default new MariaDB();
