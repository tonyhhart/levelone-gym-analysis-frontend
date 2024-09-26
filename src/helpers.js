// Importa as bibliotecas axios e papaparse
import axios from "axios";
import Papa from "papaparse";

// Função para converter CSV em um array de objetos
export async function csvToArray(url) {
  try {
    // Faz a requisição para obter o conteúdo do CSV
    const response = await axios.get(url);

    // Verifica se o status da resposta é sucesso
    if (response.status === 200) {
      // Utiliza o PapaParse para converter o CSV em array de objetos
      const parsedData = Papa.parse(response.data, {
        header: true, // Usa a primeira linha do CSV como chave dos objetos
        skipEmptyLines: true, // Ignora linhas vazias
      });

      // Retorna os dados convertidos em array de objetos
      return parsedData.data;
    } else {
      console.error("Erro ao buscar o arquivo CSV");
      return [];
    }
  } catch (error) {
    console.error("Erro na requisição do arquivo CSV:", error);
    return [];
  }
}
