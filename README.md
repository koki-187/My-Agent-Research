# My-Agent-Research
人物リサーチ機能

## セットアップ

### OpenAI API設定

このアプリケーションはOpenAI APIを使用します。環境変数 `OPENAI_API_KEY` の設定が必要です。

詳細な設定方法は [OPENAI_SETUP.md](./OPENAI_SETUP.md) を参照してください。

### インストール

```bash
# 依存関係のインストール
npm install

# 環境変数の設定（ローカル開発）
cp .env.example .env
# .env ファイルを編集してAPIキーを設定
```

### 使用方法

```bash
# APIキー設定の確認
npm test

# 人物リサーチの実行
node index.js "人物名" "追加コンテキスト"
```

## ChatGPT/Copilot 連携

このリポジトリはChatGPT/GitHub Copilotからのプッシュができるように設定されています。
詳細は [COPILOT_SETUP.md](./COPILOT_SETUP.md) を参照してください。
