# remove-csdn-info.ps1
# 用途：批量删除 CSDN 迁移文章中的版权信息（原创、阅读量、原文链接）
# 使用方法：在项目根目录运行 .\remove-csdn-info.ps1
# 适用目录：posts/ 下的所有子文件夹（如 posts/Vue、posts/微信小程序 等）

$targetDirs = @(
    "posts/Vue",
    "posts/微信小程序",
    "posts/JavaScript"
    # 后续新增的专栏可以添加在这里
)

foreach ($dir in $targetDirs) {
    if (Test-Path $dir) {
        Write-Host "正在处理: $dir" -ForegroundColor Cyan
        Get-ChildItem -Path $dir -Recurse -Include "*.mdx", "*.md" | ForEach-Object {
            $path = $_.FullName
            $text = Get-Content -Path $path -Raw -Encoding UTF8
            $text = $text -replace '(?m)^> 原创 已于 .* 修改 · .* 阅读 · .* · .* ·\s*', ''
            $text = $text -replace '(?m)^> 本内容遵循CC 4.0 BY-SA版权协议 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。\s*', ''
            $text = $text -replace '(?m)^> 文章链接：https://blog.csdn.net/.*\s*', ''
            Set-Content -Path $path -Value $text -Encoding UTF8
            Write-Host "  已处理: $path" -ForegroundColor Green
        }
    } else {
        Write-Host "跳过: $dir (目录不存在)" -ForegroundColor Yellow
    }
}

Write-Host "`n✅ 全部处理完成！" -ForegroundColor Magenta