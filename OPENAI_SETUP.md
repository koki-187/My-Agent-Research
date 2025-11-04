# OpenAI API Key Configuration

このドキュメントでは、OpenAI API キーの設定方法について説明します。

## 概要

このリポジトリでは、OpenAI APIを使用するために `OPENAI_API_KEY` 環境変数を参照します。GitHubのシークレット `MALAPI` または `MYAGENTRESEARCH_API` に保存されているAPIキーが、ワークフローやデプロイ環境で `OPENAI_API_KEY` にマッピングされます。

## GitHub Actions での設定

### シークレットの設定

1. GitHubリポジトリの **Settings** → **Secrets and variables** → **Actions** に移動
2. 以下のいずれかのシークレットを設定：
   - `MALAPI`: OpenAI APIキー
   - または `MYAGENTRESEARCH_API`: OpenAI APIキー

### ワークフローでの使用

ワークフローファイルでは、自動的に環境変数にマッピングされます：

```yaml
jobs:
  your-job:
    runs-on: ubuntu-latest
    
    env:
      OPENAI_API_KEY: ${{ secrets.MALAPI || secrets.MYAGENTRESEARCH_API }}
    
    steps:
      - name: Your step
        run: |
          # OPENAI_API_KEY 環境変数が利用可能です
          node your-script.js
```

既存のワークフローファイル：
- `.github/workflows/copilot-push.yml`
- `.github/workflows/example-auto-commit.yml`

これらのファイルには既に環境変数のマッピングが設定されています。

## ローカル開発環境での設定

### 1. 環境変数ファイルの作成

```bash
# .env.example をコピーして .env を作成
cp .env.example .env
```

### 2. APIキーの設定

`.env` ファイルを編集して、実際のOpenAI APIキーを設定：

```
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**注意**: `.env` ファイルは `.gitignore` に含まれており、Gitにコミットされません。

### 3. 環境変数の読み込み

Node.jsアプリケーションで環境変数を使用する場合：

```javascript
// process.env.OPENAI_API_KEY から環境変数を読み込む
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not set');
}
```

dotenvパッケージを使用する場合（オプション）：

```bash
npm install dotenv
```

```javascript
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
```

## デプロイ環境での設定

### Vercel

1. プロジェクトの **Settings** → **Environment Variables** に移動
2. 環境変数を追加：
   - Name: `OPENAI_API_KEY`
   - Value: OpenAI APIキー

### Heroku

```bash
heroku config:set OPENAI_API_KEY=sk-your-openai-api-key-here
```

### その他のプラットフォーム

各プラットフォームの環境変数設定機能を使用して、`OPENAI_API_KEY` を設定してください。

## アプリケーションコードでの使用

### 基本的な使用例

```javascript
const { OpenAI } = require('openai');

// process.env.OPENAI_API_KEY から自動的に読み込まれる
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function example() {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Hello!' }],
  });
  
  console.log(completion.choices[0].message.content);
}
```

### このリポジトリのサンプルコード

- `index.js`: 人物リサーチのサンプル実装
- `examples/test-openai-connection.js`: APIキー設定の検証スクリプト

## 検証方法

### APIキー設定の確認

```bash
# 依存関係のインストール
npm install

# 環境変数の確認
npm test
```

このコマンドは `examples/test-openai-connection.js` を実行し、`OPENAI_API_KEY` が正しく設定されているかを確認します。

### 実際のAPI接続テスト（オプション）

```bash
RUN_API_TEST=true npm test
```

**注意**: このテストは実際にOpenAI APIを呼び出すため、少額の費用が発生する可能性があります。

## セキュリティのベストプラクティス

1. **APIキーを直接コードに書かない**
   - ❌ `const apiKey = 'sk-...'`
   - ✅ `const apiKey = process.env.OPENAI_API_KEY`

2. **.env ファイルをGitにコミットしない**
   - `.gitignore` に `.env` が含まれていることを確認

3. **APIキーを共有しない**
   - チームメンバーには個別にシークレット設定方法を伝える

4. **定期的にAPIキーをローテーション**
   - 不要になったキーは無効化する

## トラブルシューティング

### エラー: "OPENAI_API_KEY is not set"

**原因**: 環境変数が設定されていません。

**解決方法**:
- ローカル開発: `.env` ファイルを作成し、APIキーを設定
- GitHub Actions: リポジトリシークレット `MALAPI` または `MYAGENTRESEARCH_API` を設定
- デプロイ環境: プラットフォームの環境変数設定を確認

### エラー: "Invalid API key"

**原因**: APIキーが間違っているか、無効です。

**解決方法**:
- OpenAI アカウントで新しいAPIキーを生成
- 正しいキーを環境変数に設定

## 参考リンク

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [OpenAI Node.js Library](https://github.com/openai/openai-node)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
