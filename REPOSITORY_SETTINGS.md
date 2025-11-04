# Repository Settings for ChatGPT/Copilot Push

このファイルは、ChatGPT/Copilotからのプッシュを有効にするための推奨リポジトリ設定を記載しています。

## GitHub Actions の権限設定

リポジトリのオーナーまたは管理者は、以下の設定を行う必要があります：

### 1. Actions の権限を有効化

1. リポジトリのページで **Settings** タブをクリック
2. 左メニューの **Actions** > **General** をクリック
3. **Workflow permissions** セクションで以下を選択：
   - ✅ **Read and write permissions** を選択
   - ✅ **Allow GitHub Actions to create and approve pull requests** にチェック
4. **Save** をクリック

### 2. ブランチ保護ルール（オプション）

メインブランチを保護する場合：

1. **Settings** > **Branches** に移動
2. **Branch protection rules** で **Add rule** をクリック
3. ブランチ名のパターン（例：`main` または `master`）を入力
4. 推奨設定：
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ⚠️ **Include administrators** は必要に応じて

注意：ブランチ保護を有効にすると、ワークフローは保護されていないブランチ（例：`feature/*`、`dev`）にのみプッシュできます。

## GitHub Copilot Workspace の設定

GitHub Copilot Workspace を使用する場合：

1. リポジトリで Copilot が有効になっていることを確認
2. Organization の Copilot 設定で、このリポジトリへのアクセスが許可されていることを確認

## トークンとシークレット

このセットアップでは、追加のシークレットやトークンは必要ありません。
GitHub Actions は自動的に `GITHUB_TOKEN` を提供します。

カスタム認証が必要な場合：
1. **Settings** > **Secrets and variables** > **Actions** に移動
2. **New repository secret** をクリック
3. シークレットを追加（例：`CUSTOM_GITHUB_TOKEN`）
4. ワークフローファイルで使用する

## セキュリティのベストプラクティス

1. **最小権限の原則**: 必要な権限のみを付与
2. **監査ログの確認**: Actions の実行履歴を定期的に確認
3. **シークレットの管理**: 必要最小限のシークレットのみを保存
4. **ワークフローの検証**: 実行前にワークフローの内容を確認

## 確認方法

設定が正しく行われているか確認するには：

1. リポジトリの **Actions** タブを開く
2. **Copilot Auto Push** ワークフローを選択
3. **Run workflow** ボタンが表示されることを確認
4. テスト実行を行う（空のコミットでも可）
