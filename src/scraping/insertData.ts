import { AppDataSource } from "../config/typeorm";

const insertData = async (Table: any, data: any) => {
  let serviceDS = await AppDataSource;
  const result = await serviceDS.getRepository(Table)
  await result.createQueryBuilder().insert()
    .into(Table)
    .values(data)
    .orIgnore()
    .execute();
}

export default insertData;