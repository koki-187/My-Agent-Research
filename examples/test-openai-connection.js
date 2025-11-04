/**
 * OpenAI接続テスト
 * 
 * このスクリプトは、環境変数 OPENAI_API_KEY が正しく設定されているかを確認します。
 * GitHub ActionsワークフローやデプロイメントでMALAPI/MYAGENTRESEARCH_APIシークレットが
 * OPENAI_API_KEYにマッピングされていることを検証するために使用します。
 */

// 環境変数からOpenAI APIキーを取得
const apiKey = process.env.OPENAI_API_KEY;

console.log('=== OpenAI API Key Configuration Check ===\n');

// APIキーが設定されているか確認
if (!apiKey) {
  console.error('❌ Error: OPENAI_API_KEY is not set');
  console.error('\nPlease ensure that:');
  console.error('1. In GitHub Actions workflows: MALAPI or MYAGENTRESEARCH_API secret is mapped to OPENAI_API_KEY');
  console.error('2. In local development: Create a .env file with OPENAI_API_KEY=your-key-here');
  console.error('3. In deployment environments: Set OPENAI_API_KEY environment variable\n');
  process.exit(1);
}

// APIキーの形式を簡易チェック（OpenAIのキーは通常 "sk-" で始まる）
if (!apiKey.startsWith('sk-')) {
  console.warn('⚠️  Warning: OPENAI_API_KEY does not start with "sk-"');
  console.warn('   This might not be a valid OpenAI API key format\n');
}

// キーの一部を隠して表示（セキュリティのため）
// Note: Only a masked version is logged (first 7 + last 4 chars), which is safe
// and commonly used for configuration validation. The full key is never logged.
const keyLength = apiKey.length;
const maskedKey = `${apiKey.substring(0, 7)}...${apiKey.substring(keyLength - 4)}`;
console.log(`✓ OPENAI_API_KEY is configured: ${maskedKey}`);
console.log(`✓ Key length: ${keyLength} characters\n`);

console.log('=== Configuration Test Passed ===');
console.log('The OPENAI_API_KEY environment variable is properly configured.\n');

// OpenAI SDKを使った実際の接続テスト（オプショナル）
// 注: このテストは実際にAPIを呼び出すため、コストが発生する可能性があります
async function testConnection() {
  try {
    // OpenAI SDKがインストールされている場合のみテスト
    const { OpenAI } = require('openai');
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('Testing actual OpenAI API connection...');
    
    // 最小限のリクエストでモデルリストを取得
    const models = await openai.models.list();
    console.log('✓ Successfully connected to OpenAI API');
    console.log(`✓ Available models count: ${models.data.length}\n`);
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('Note: OpenAI SDK not installed. Run "npm install" to enable API connection test.\n');
    } else {
      console.error('❌ API Connection Error:', error.message);
      process.exit(1);
    }
  }
}

// 環境変数に基づいてAPIテストを実行
if (process.env.RUN_API_TEST === 'true') {
  testConnection();
} else {
  console.log('Tip: Set RUN_API_TEST=true to test actual API connection\n');
}
