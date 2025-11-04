/**
 * 人物リサーチのサンプル実装
 * Sample implementation for character/person research using OpenAI API
 * 
 * このファイルは、OPENAI_API_KEY環境変数を使用してOpenAI APIにアクセスする
 * 基本的な実装例を示しています。
 */

const { OpenAI } = require('openai');

// process.env.OPENAI_API_KEYから環境変数を読み込む
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 人物リサーチを実行する関数
 * @param {string} personName - リサーチ対象の人物名
 * @param {string} context - 追加のコンテキスト情報
 * @returns {Promise<string>} リサーチ結果
 */
async function researchPerson(personName, context = '') {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  try {
    const prompt = `人物リサーチ: ${personName}
${context ? `追加情報: ${context}` : ''}

この人物について、以下の観点から簡潔に分析してください：
1. 背景情報
2. 特徴的な要素
3. 関連する話題`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは人物リサーチの専門家です。与えられた情報から客観的な分析を提供してください。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error during person research:', error.message);
    throw error;
  }
}

// モジュールとしてエクスポート
module.exports = {
  researchPerson,
};

// コマンドラインから直接実行された場合
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('使用方法: node index.js <人物名> [追加コンテキスト]');
    console.log('例: node index.js "田中太郎" "営業担当"');
    process.exit(1);
  }

  const [personName, ...contextParts] = args;
  const context = contextParts.join(' ');

  console.log(`人物リサーチを開始: ${personName}\n`);

  researchPerson(personName, context)
    .then((result) => {
      console.log('=== リサーチ結果 ===\n');
      console.log(result);
    })
    .catch((error) => {
      console.error('エラー:', error.message);
      process.exit(1);
    });
}
