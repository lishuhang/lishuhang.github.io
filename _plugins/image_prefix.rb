# frozen_string_literal: true

# ImagePrefix plugin for lishuhang.me (v1.16, 2026-07-24)
#
# Rewrites relative image paths (/YYYY/MM/DD/slug/NN.ext) to full URLs
# based on post date and site.image_prefixes.
#
# Strategy: use :post_render hook to modify the FINAL HTML output.
# This fires after kramdown converts markdown to HTML AND after the
# layout is applied, so we can rewrite ALL image URLs in the final HTML:
#   - Content images: <img src="/YYYY/..."> (from markdown ![](...))
#   - Cover image: <img data-original="https://lishuhang.me/YYYY/...">
#     (from layout's absolute_url filter on page.image)
#   - weserv.nl proxy URLs containing lishuhang.me/YYYY/...
#
# Previous attempts (all failed):
#   - Generator with priority :low → ran after seo-tag cached the image
#   - :pre_render hook → ran after seo-tag's :pre_render (registration order)
#   - :post_init hook → post.content not reliably available
#   - Generator with priority :high → rewrote post.content but Jekyll's
#     renderer re-read content, so the rewrite was lost
#   - :post_render with only relative path regex → didn't catch absolute URLs
#     produced by layout's absolute_url filter
#
# Config format in _config.yml:
#   image_prefixes:
#     - range: [null, "2026-07"]
#       prefix: "https://lishuhang.me/img/"
#     - range: ["2026-08", null]
#       prefix: "https://lishuhang.me/img/"

module Jekyll
  module ImagePrefix
    @rewrite_count = 0

    class << self
      attr_accessor :rewrite_count
    end

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

    # Rewrite image URLs in rendered HTML output (called from :post_render hook)
    def self.rewrite_html_output(post, site)
      output = post.output
      return if output.nil? || output.empty?

      date_str = post.date.strftime('%Y-%m')
      prefix = pick_prefix(site, date_str)
      return if prefix.nil? || prefix.empty?

      prefix_clean = prefix.chomp('/')
      # Extract the host from prefix (e.g., "https://lishuhang.me" from
      # "https://lishuhang.me/img/") for matching absolute URLs
      host = prefix_clean.sub(%r{/img$}, '')

      match_count = 0

      # ── 1. Rewrite relative paths: src="/YYYY/..." ──
      # These come from markdown ![](...) converted by kramdown
      %w[src data-original srcset data-src data-lazy].each do |attr|
        output = output.gsub(%r{(#{attr}=["'])/(\d{4}/[^"']+)["']}) do
          md = Regexp.last_match
          match_count += 1
          quote = md[1][-1, 1]
          "#{md[1]}#{prefix_clean}/#{md[2]}#{quote}"
        end
      end

      # ── 2. Rewrite absolute URLs missing /img/: host/YYYY/... → host/img/YYYY/... ──
      # These come from layout's absolute_url filter on page.image
      # Match: https://lishuhang.me/2026/... but NOT https://lishuhang.me/img/2026/...
      # and NOT https://lishuhang.me/assets/... etc.
      output = output.gsub(%r{(#{Regexp.escape(host)})/(\d{4}/\d{2}/[^"'\s<>]+)}) do
        md = Regexp.last_match
        # Skip if already has /img/ after host
        next md[0] if md[2].start_with?('img/')
        match_count += 1
        "#{md[1]}/img/#{md[2]}"
      end

      # ── 3. Rewrite URL-encoded absolute URLs in weserv.nl proxy ──
      # weserv proxy: url=https%3A%2F%2Flishuhang.me%2F2026%2F...
      # We need to insert %2Fimg%2F after lishuhang.me%2F
      encoded_host = Regexp.escape(host.gsub('/', '%2F').gsub(':', '%3A'))
      output = output.gsub(%r{(#{encoded_host})%2F(\d{4}%2F\d{2}%2F[^&"'\s<>]+)}) do
        md = Regexp.last_match
        next md[0] if md[2].start_with?('img%2F')
        match_count += 1
        "#{md[1]}%2Fimg%2F#{md[2]}"
      end

      if match_count > 0
        post.output = output
        @rewrite_count += match_count
        Jekyll.logger.debug 'ImagePrefix:',
                            "Rewrote #{match_count} URLs in '#{post.data['title']}'"
      end
    end
  end
end

# :post_render hook — rewrite image URLs in the final rendered HTML.
# This fires after kramdown converts markdown to HTML AND after the layout
# is applied, so we catch ALL image URLs (content + cover + weserv proxy).
Jekyll::Hooks.register :posts, :post_render do |post|
  Jekyll::ImagePrefix.rewrite_html_output(post, post.site)
end

Jekyll::Hooks.register :site, :after_init do |site|
  prefixes = Jekyll::ImagePrefix.config(site)
  Jekyll.logger.info 'ImagePrefix:',
                     "Loaded with #{prefixes.size} prefix ranges (v1.16 post_render strategy)"
end

Jekyll::Hooks.register :site, :post_write do |site|
  Jekyll.logger.info 'ImagePrefix:',
                     "Total URLs rewritten: #{Jekyll::ImagePrefix.rewrite_count}"
end
