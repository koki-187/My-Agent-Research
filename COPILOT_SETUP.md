# ChatGPT/Copilot Push 設定

このリポジトリはChatGPTやGitHub Copilotからのプッシュができるように設定されています。

## 設定内容

### GitHub Actions ワークフロー

`.github/workflows/copilot-push.yml` ファイルが自動コミット・プッシュを可能にします。

#### 使い方

1. GitHubリポジトリのActionsタブに移動
2. "Copilot Auto Push"ワークフローを選択
3. "Run workflow"をクリック
4. コミットメッセージとブランチを入力
5. "Run workflow"を実行

### 必要な権限

このワークフローは以下の権限を使用します：
- `contents: write` - リポジトリへのコミット権限
- `pull-requests: write` - プルリクエストの作成権限

### セキュリティ

- ワークフローは`GITHUB_TOKEN`を使用してGitHub Actionsが自動的に提供する認証トークンで動作します
- 手動トリガー（`workflow_dispatch`）のみで実行されるため、意図しない自動実行はありません

## ChatGPT/Copilotからの利用

### GitHub Copilot Workspace

GitHub Copilot Workspaceを使用する場合、このワークフローを使って変更を自動的にコミット・プッシュできます。

### ChatGPT

ChatGPT（GitHub統合を持つバージョン）を使用する場合：
1. リポジトリへの変更を行う
2. Actions経由でコミット・プッシュを実行

## トラブルシューティング

### 権限エラー

リポジトリの設定で以下を確認してください：
1. Settings > Actions > General
2. "Workflow permissions"で"Read and write permissions"が有効になっているか確認

### ブランチ保護

メインブランチに保護ルールがある場合、別のブランチを作成してそこにプッシュしてください。
