<template>
  <div class="p-flow styleguide">
    <h1>Style Guide</h1>
    <p class="lead">Chrono Albums visual identity — warm, nostalgic, minimal</p>

    <!-- Colors -->
    <section class="p-flow">
      <h2>Colors</h2>

      <h3>Brand</h3>
      <div class="color-grid">
        <div class="color-swatch" style="background: var(--brand-color-dim)">
          <span>brand-dim</span>
        </div>
        <div class="color-swatch" style="background: var(--brand-color)">
          <span>brand</span>
        </div>
        <div class="color-swatch" style="background: var(--brand-color-bright)">
          <span>brand-bright</span>
        </div>
      </div>

      <h3>Surfaces</h3>
      <div class="color-grid">
        <div class="color-swatch surface" style="background: var(--surface-0)">
          <span>surface-0</span>
        </div>
        <div class="color-swatch surface" style="background: var(--surface-1)">
          <span>surface-1</span>
        </div>
        <div class="color-swatch surface" style="background: var(--surface-2)">
          <span>surface-2</span>
        </div>
        <div class="color-swatch surface" style="background: var(--surface-3)">
          <span>surface-3</span>
        </div>
      </div>

      <h3>Text</h3>
      <div class="color-grid">
        <div class="color-swatch" style="background: var(--text-color-1)">
          <span>text-1</span>
        </div>
        <div class="color-swatch" style="background: var(--text-color-2)">
          <span>text-2</span>
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="p-flow">
      <h2>Typography</h2>

      <div class="type-sample">
        <h1>Heading 1</h1>
        <p>
          Primary heading for page titles. Font: Alike (transitional serif).
        </p>
      </div>

      <div class="type-sample">
        <h2>Heading 2</h2>
        <p>Section headings within pages.</p>
      </div>

      <div class="type-sample">
        <h3>Heading 3</h3>
        <p>Subsection headings.</p>
      </div>

      <div class="type-sample">
        <p>
          Body text with <a href="#">inline link</a> and
          <strong>bold emphasis</strong>. The warm serif typeface evokes
          nostalgia while remaining highly readable.
        </p>
      </div>

      <p class="text-muted">Secondary text using text-color-2</p>
    </section>

    <!-- Components -->
    <section class="p-flow">
      <h2>Components</h2>

      <h3>Buttons</h3>
      <div class="component-row">
        <button class="p-button">Primary</button>
        <button class="p-button" data-variant="secondary">Secondary</button>
        <button class="p-button" data-variant="ghost">Ghost</button>
      </div>

      <h3>Alerts</h3>
      <div class="p-flow">
        <AlertsTheAlert type="success">Success message</AlertsTheAlert>
        <AlertsTheAlert type="error">Error message</AlertsTheAlert>
        <AlertsTheAlert type="info">Info message</AlertsTheAlert>
      </div>

      <h3>Cards</h3>
      <div class="card-demo">
        <div class="card">
          <div class="card-body">
            <h4>Album Card</h4>
            <p class="text-muted">12 photos · June 2024</p>
          </div>
        </div>
      </div>

      <h3>Photo Frame</h3>
      <div
        class="photo-frame"
        style="
          max-width: 200px;
          aspect-ratio: 4/3;
          background: var(--surface-2);
        "
      ></div>
    </section>

    <!-- Utilities -->
    <section class="p-flow">
      <h2>Utilities</h2>

      <h3>Shadows</h3>
      <div class="shadow-grid">
        <div class="shadow-sample" style="box-shadow: var(--shadow-1)">
          shadow-1
        </div>
        <div class="shadow-sample" style="box-shadow: var(--shadow-2)">
          shadow-2
        </div>
        <div class="shadow-sample" style="box-shadow: var(--shadow-3)">
          shadow-3
        </div>
      </div>

      <h3>Spacing (p-flow)</h3>
      <div
        class="p-flow"
        style="background: var(--surface-1); padding: var(--space-4)"
      >
        <div style="background: var(--surface-3); padding: var(--space-2)">
          Item 1
        </div>
        <div style="background: var(--surface-3); padding: var(--space-2)">
          Item 2
        </div>
        <div style="background: var(--surface-3); padding: var(--space-2)">
          Item 3
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.styleguide {
  max-width: 800px;
  margin-inline: auto;
  padding-block: var(--space-8);
}

.lead {
  font-size: var(--font-size-1);
  color: var(--text-color-2);
}

/* Color swatches */
.color-grid {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.color-swatch {
  width: 100px;
  height: 80px;
  border-radius: var(--radius-2);
  display: flex;
  align-items: flex-end;
  padding: var(--space-2);

  span {
    font-size: var(--font-size--1);
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  &.surface span {
    color: var(--text-color-1);
    text-shadow: none;
  }
}

/* Type samples */
.type-sample {
  padding: var(--space-4);
  background: var(--surface-1);
  border-radius: var(--radius-2);
}

.text-muted {
  color: var(--text-color-2);
}

/* Component demos */
.component-row {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  align-items: center;
}

/* Card */
.card {
  background: var(--surface-1);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-1);
  overflow: hidden;
}

.card-body {
  padding: var(--space-4);

  h4 {
    margin: 0;
  }

  p {
    margin: var(--space-1) 0 0;
  }
}

.card-demo {
  max-width: 250px;
}

/* Shadows */
.shadow-grid {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.shadow-sample {
  width: 120px;
  height: 80px;
  background: var(--surface-0);
  border-radius: var(--radius-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size--1);
  color: var(--text-color-2);
}
</style>
