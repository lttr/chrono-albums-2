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
        <button class="p-button p-button-brand">Primary</button>
        <button class="p-button p-button-secondary">Secondary</button>
        <button class="p-button">Default</button>
      </div>
      <div class="component-row">
        <button class="p-button p-button-small">Small</button>
        <button class="p-button" disabled>Disabled</button>
      </div>

      <h3>Alerts</h3>
      <div class="p-flow">
        <AlertsTheAlert type="success">Success message</AlertsTheAlert>
        <AlertsTheAlert type="error">Error message</AlertsTheAlert>
        <AlertsTheAlert type="info">Info message</AlertsTheAlert>
      </div>

      <h3>Admin Cards</h3>
      <div class="card-grid">
        <!-- Simple card -->
        <AdminCard title="Simple Card" />

        <!-- Card with badge -->
        <AdminCard title="Card with Badge" badge="6/2024" />

        <!-- Card with body content -->
        <AdminCard title="Card with Body" badge="12 items">
          Additional details or metadata can go here in the body slot.
        </AdminCard>

        <!-- Clickable card -->
        <AdminCard title="Clickable Card" badge="Link" to="/styleguide">
          This card is a link. Hover to see the effect.
        </AdminCard>

        <!-- Card with actions -->
        <AdminCard title="Card with Actions" badge="Action">
          <template #actions>
            <button class="p-button p-button-small">Edit</button>
            <button class="p-button p-button-small">Delete</button>
          </template>
        </AdminCard>

        <!-- Full example -->
        <AdminCard title="Album Example" badge="6/2024" to="/styleguide">
          <dl class="meta-list">
            <div>
              <dt>Project</dt>
              <dd>Summer 2024</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>Camps</dd>
            </div>
            <div>
              <dt>Media</dt>
              <dd>48</dd>
            </div>
          </dl>
          <template #actions>
            <a href="#" class="icon-link" aria-label="External link">
              <Icon name="uil:external-link-alt" />
            </a>
          </template>
        </AdminCard>
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

      <h3>Form Controls</h3>
      <div class="form-demo">
        <div class="p-form-group">
          <label for="demo-input">Text Input</label>
          <input id="demo-input" type="text" placeholder="Enter text..." />
        </div>

        <div class="p-form-group">
          <label for="demo-select">Select</label>
          <select id="demo-select">
            <option value="">Choose an option...</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </div>

        <div class="p-form-group">
          <label for="demo-textarea">Textarea</label>
          <textarea
            id="demo-textarea"
            placeholder="Enter longer text..."
          ></textarea>
        </div>

        <div class="p-form-group">
          <label>
            <input type="checkbox" />
            Checkbox option
          </label>
        </div>
      </div>

      <h3>Navigation</h3>
      <nav class="breadcrumb-demo">
        <a href="#">Admin</a>
        <span class="separator">›</span>
        <a href="#">Projects</a>
        <span class="separator">›</span>
        <span class="current">Album Name</span>
      </nav>

      <h3>States</h3>
      <div class="states-demo">
        <div class="state-item">
          <span class="loading-spinner"></span>
          <span>Loading...</span>
        </div>
        <div class="state-item empty-state">No items found</div>
      </div>
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

/* Card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-4);
}

.meta-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  font-size: var(--font-size--2);

  div {
    display: flex;
    gap: var(--space-2);
  }

  dt {
    width: 5rem;
    font-weight: var(--font-weight-6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  dd {
    margin: 0;
  }
}

.icon-link {
  color: var(--text-color-2);
  opacity: 0.5;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
    color: var(--brand-color);
  }
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

/* Form demo */
.form-demo {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 400px;
}

/* Breadcrumb demo */
.breadcrumb-demo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size--1);
  color: var(--text-color-2);

  a {
    color: var(--text-color-2);
    text-decoration: none;

    &:hover {
      color: var(--brand-color);
    }
  }

  .separator {
    opacity: 0.5;
  }

  .current {
    color: var(--text-color-1);
  }
}

/* States demo */
.states-demo {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.state-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background: var(--surface-1);
  border-radius: var(--radius-2);
}

.loading-spinner {
  width: 1em;
  height: 1em;
  border: 2px solid var(--surface-3);
  border-top-color: var(--brand-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  color: var(--text-color-2);
  font-style: italic;
}
</style>
