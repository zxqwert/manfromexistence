// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/// A scheme that places the source color in [Scheme.primaryContainer].
///
/// Primary Container is the source color, adjusted for color relativity.
/// It maintains constant appearance in light mode and dark mode.
/// This adds ~5 tone in light mode, and subtracts ~5 tone in dark mode.
///
/// Tertiary Container is an analogous color, specifically, the analog of a
/// color wheel divided into 6, and the precise analog is the one found by
/// increasing hue. It also maintains constant appearance.
public class SchemeContent: DynamicScheme {
  public init(sourceColorHct: Hct, isDark: Bool, contrastLevel: Double) {
    super.init(
      sourceColorArgb: sourceColorHct.toInt(),
      variant: Variant.content,
      isDark: isDark,
      contrastLevel: contrastLevel,
      primaryPalette: TonalPalette.of(
        sourceColorHct.hue,
        sourceColorHct.chroma
      ),
      secondaryPalette: TonalPalette.of(
        sourceColorHct.hue,
        max(sourceColorHct.chroma - 32, sourceColorHct.chroma * 0.5)
      ),
      tertiaryPalette: TonalPalette.fromHct(
        DislikeAnalyzer.fixIfDisliked(
          TemperatureCache(sourceColorHct)
            .analogous(count: 3, divisions: 6)
            .last!
        )
      ),
      neutralPalette: TonalPalette.of(
        sourceColorHct.hue,
        sourceColorHct.chroma / 8
      ),
      neutralVariantPalette: TonalPalette.of(
        sourceColorHct.hue,
        (sourceColorHct.chroma / 8) + 4
      )
    )
  }
}
