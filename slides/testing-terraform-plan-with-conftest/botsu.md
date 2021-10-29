---

# Terraform のテスト戦略

<center>
<img src="https://www.datocms-assets.com/2885/1614617558-terraformtestingpyramid.png" class="h-sm" />

*Testing HashiCorp Terraform (https://www.hashicorp.com/blog/testing-hashicorp-terraform) より*
</center>

---

# Terraform のテストの種類

## Modules
- Terraform モジュール自体
- 🙅 **今回は扱わない**

## Configuration
- 環境に適用される Terraform の設定
- 🙆‍♂️ **今回扱う**

---

# Testing Terraform Configuration
UNIT TEST、INTEGRATION TEST、END-TO-END TEST

<center>
<img src="https://www.datocms-assets.com/2885/1614620711-terraformtestingconfiguration.png" class="" />

*Testing HashiCorp Terraform (https://www.hashicorp.com/blog/testing-hashicorp-terraform) より*
</center>

---

# Terraform のテスト戦略

| 名称 | 説明 | 
| --- | --- |
| MANUAL TESTS | 手動テスト |
| END-TO-END TESTS | アプリケーションのテスト |
| INTEGRATION TESTS | リソースが正常に作成されるか |
| UNIT TESTS | ユニットテスト |

---

# Terraform のテスト戦略

| 名称 | 例 | 
| --- | --- |
| END-TO-END TESTS | あらゆる言語、フレームワーク |
| INTEGRATION TESTS | Terratest, kitchen-terraform |
| UNIT TESTS  | `terraform fmt -check`, HashiCorp Sentinel |


---
layout: fact
---

## plan 結果のテストはどこのフェーズ？

INTEGRATION TESTS? 

END-TO-END TESTS?



---

# plan 結果を自動でテストしたい

- `terraform apply` する前に想定通りの変更が行われるかを確認する必要がある
  - 無関係のリソースが変更されてしまうことは避けたい
- Terraform 設定の規模が大きくなるにつれて plan 結果を見るのがつらくなる
- `terraform apply` を自動化したい場合に検証も自動化する必要がある

---

# apply を自動化したい

- AWS EC2 AutoScalingGroup で EC2 インスタンスを自動起動したい
- 自動起動するインスタンスの AMI を定期的（週一）に自動更新したい
  - ＝ AMI を新たに作成してそれを利用するようにしたい

<br>

しかし、**AMI を更新するたびに `terraform apply` を行わなければいけない**

理由

1. AMI を新たに作成するたびに新しい AMI ID が発行される
2. 新しい AMI ID を起動するインスタンスの設定（Launch Configuration）に指定するたびに新しい Launch Configuration が作成される
3. 新しい Launch Configuration を AutoScalingGroup に指定する必要がある
