# frozen_string_literal: true

# ImagePrefix plugin for lishuhang.me (v1.16, 2026-07-24)
#
# Rewrites relative image paths (/YYYY/MM/DD/slug/NN.ext) to full URLs
# based on post date and site.image_prefixes.
#
# Strategy: use :post_render hook to modify the FINAL HTML output.
# This fires after kramdown has converted markdown to HTML, so we can
# reliably rewrite <img src="..."> and data-original="..." attributes
# in the rendered HTML.
#
# Also use a :high priority Generator for the front matter 'image' field,
# which must be rewritten before seo-tag's :pre_render hook caches it.
#
# Previous attempts (all failed):
#   - Generator with priority :low → ran after seo-tag cached the image
#   - :pre_render hook → ran after seo-tag's :pre_render (registration order)
#   - :post_init hook → post.content not reliably available
#   - Generator with priority :high → rewrote post.content but Jekyll's
#     renderer re-read content, so the rewrite was lost
#
# Config format in _config.yml:
#   image_prefixes:
#     - range: [null, "2026-07"]
#       prefix: "https://lishuhang.me/img/"
#     - range: ["2026-08", null]
#       prefix: "https://lishuhang.me/img/"

module Jekyll
  module ImagePrefix
    def self.config(site)
      @prefixes_cache ||= {}
      @prefixes_cache[site.object_id] ||= begin
        prefixes = site.config['image_prefixes'] || []
        if prefixes.empty?
          prefixes = [{ 'range' => [nil, nil], 'prefix' => site.config['url'] || '' }]
        end
        prefixes
      end
    end

    def self.pick_prefix(site, date_str)
      config(site).each do |entry|
        range = entry['range'] || [nil, nil]
        lower, upper = range[0], range[1]
        next if lower && date_str < lower
        next if upper && date_str >= upper
        return entry['prefix'].to_s
      end
      config(site).last && config(site).last['prefix'].to_s
    end

    # Rewrite the front matter 'image' field (called from Generator)
    def self.rewrite_front_matter(post, site)
      return unless post.data['image'].is_a?(String)
      return if post.data['image'] =~ %r{\Ahttps?://}  # already absolute

      date_str = post.date.strftime('%Y-%m')
      prefix = pick_prefix(site, date_str)
      return if prefix.nil? || prefix.empty?

      prefix_clean = prefix.chomp('/')

      if post.data['image'] =~ %r{\A/\d{4}/}
        post.data['image'] = prefix_clean + post.data['image']
      end
    end

    # Rewrite image URLs in rendered HTML output (called from :post_render hook)
    def self.rewrite_html_output(post, site)
      output = post.output
      return if output.nil? || output.empty?

      date_str = post.date.strftime('%Y-%m')
      prefix = pick_prefix(site, date_str)
      return if prefix.nil? || prefix.empty?

      prefix_clean = prefix.chomp('/')
      original_output = output
      match_count = 0

      # Rewrite: src="/YYYY/..."
      output = output.gsub(%r{(src=["'])/(\d{4}/[^"']+)["']}) do
        md = Regexp.last_match
        match_count += 1
        quote = md[1][-1, 1]
        "#{md[1]}#{prefix_clean}/#{md[2]}#{quote}"
      end

      # Rewrite: data-original="/YYYY/..." (lazy-load plugins)
      output = output.gsub(%r{(data-original=["'])/(\d{4}/[^"']+)["']}) do
        md = Regexp.last_match
        match_count += 1
        quote = md[1][-1, 1]
        "#{md[1]}#{prefix_clean}/#{md[2]}#{quote}"
      end

      # Rewrite: srcset="/YYYY/..." (responsive images)
      output = output.gsub(%r{(srcset=["'])/(\d{4}/[^"']+)["']}) do
        md = Regexp.last_match
        match_count += 1
        quote = md[1][-1, 1]
        "#{md[1]}#{prefix_clean}/#{md[2]}#{quote}"
      end

      if match_count > 0
        post.output = output
        # Debug: write a sample of the rewritten output to verify
        if post.data['title'] && post.data['title'].include?('豌豆荚')
          debug_path = '/tmp/image_prefix_debug.txt'
          File.write(debug_path, "TITLE: #{post.data['title']}\nOUTPUT LENGTH: #{output.length}\nFIRST 500 CHARS:\n#{output[0..500]}\n\nCONTAINS lishuhang.me/img: #{output.include?('lishuhang.me/img')}\n")
        end
        Jekyll.logger.info 'ImagePrefix:',
                           "Rewrote #{match_count} URLs in '#{post.data['title']}'"
      end
    end
  end
end

# Generator (priority :high) — rewrite front matter 'image' field early,
# before jekyll-seo-tag's :pre_render hook caches it for SEO meta tags.
Jekyll::Hooks.register :posts, :post_init do |post|
  # post_init fires when the post is first loaded; post.data (front matter)
  # is available, and this runs before any Generator or :pre_render hook.
  if post.site
    Jekyll::ImagePrefix.rewrite_front_matter(post, post.site)
  end
end

# :post_render hook — rewrite image URLs in the final rendered HTML.
# This fires after kramdown has converted markdown ![](...) to <img src="...">,
# so we can reliably rewrite the HTML attributes.
$post_render_count = 0
$post_render_nil_count = 0

Jekyll::Hooks.register :posts, :post_render do |post|
  $post_render_count += 1
  output = post.output
  if output.nil? || output.empty?
    $post_render_nil_count += 1
  else
    Jekyll::ImagePrefix.rewrite_html_output(post, post.site)
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  Jekyll.logger.info 'ImagePrefix:',
                     "post_render fired #{$post_render_count} times (nil output: #{$post_render_nil_count})"
end

Jekyll::Hooks.register :site, :after_init do |site|
  prefixes = Jekyll::ImagePrefix.config(site)
  Jekyll.logger.info 'ImagePrefix:',
                     "Loaded with #{prefixes.size} prefix ranges (v1.16 post_render strategy)"
end
