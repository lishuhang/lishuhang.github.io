# frozen_string_literal: true

# ImagePrefix Generator for lishuhang.me
# v2.0 (2026-07-04)
#
# Rewrites relative image paths (/img/...) in post content to full URLs
# based on post date and site.image_prefixes config.
#
# Config format in _config.yml:
#
#   image_prefixes:
#     - range: [null, "2024-01"]      # before 2024-01 (prefix A)
#       prefix: "https://lishuhang.me"
#     - range: ["2024-01", "2026-07"]  # 2024-01 to 2026-07 (prefix B)
#       prefix: "https://lishuhang.me"
#     - range: ["2026-07", null]       # 2026-07 onwards (prefix C)
#       prefix: "https://lishuhang.me"
#
# In posts, image URLs are written as relative paths:
#   image: /img/2026/07/01/slug/01.png
#   ![](/img/2026/07/01/slug/01.png)
#
# At build time, this generator rewrites them to:
#   image: https://lishuhang.me/img/2026/07/01/slug/01.png
#
# This allows migrating image storage to different repos/CDNs by date range
# without rewriting all posts.

module Jekyll
  class ImagePrefixGenerator < Generator
    safe true
    priority :low

    def generate(site)
      @prefixes = site.config['image_prefixes'] || []
      if @prefixes.empty?
        @prefixes = [{ 'range' => [nil, nil], 'prefix' => site.config['url'] || '' }]
      end

      site.posts.docs.each do |post|
        rewrite_post(post)
      end
      Jekyll.logger.info 'ImagePrefix:', "Processed #{site.posts.docs.size} posts with #{@prefixes.size} prefix ranges"
    end

    def rewrite_post(post)
      date_str = post.date.strftime('%Y-%m')
      prefix = pick_prefix(date_str)
      return if prefix.nil? || prefix.empty?

      # Rewrite front matter 'image' field
      if post.data['image'].is_a?(String) && post.data['image'].start_with?('/img/')
        post.data['image'] = prefix + post.data['image']
      end

      # Rewrite image URLs in content
      # Match ![](/img/...) and image: /img/... patterns
      content = post.content
      # Markdown image: ![alt](/img/...)
      content = content.gsub(%r{(!\[[^\]]*\]\()/img/([^\)]+)\)}) do
        "#{Regexp.last_match(1)}#{prefix}/img/#{Regexp.last_match(2)})"
      end
      # HTML img src="/img/..." or src='/img/...'
      content = content.gsub(/(src=["\'])\/img\/([^\1"\']+)\1/) do
        m = Regexp.last_match
        "#{m[1]}#{prefix}/img/#{m[2]}#{m[1]}"
      end
      post.content = content
    end

    def pick_prefix(date_str)
      @prefixes.each do |entry|
        range = entry['range'] || [nil, nil]
        lower, upper = range[0], range[1]
        next if lower && date_str < lower
        next if upper && date_str >= upper
        return entry['prefix'].to_s
      end
      @prefixes.last && @prefixes.last['prefix'].to_s
    end
  end
end
