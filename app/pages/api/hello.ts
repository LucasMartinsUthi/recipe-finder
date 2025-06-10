// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  nome: string;
  itens: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const response = await fetch('http://localhost:5000/recipes');
  console.log({ response });
  const data = await response.json();

  res.status(200).json(data);
}
