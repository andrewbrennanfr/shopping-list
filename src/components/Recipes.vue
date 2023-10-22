<script setup lang="ts">
defineProps<{
    filteredRecipes: string[]
    onSelectRecipe: (event: Event) => void
    recipes: string[]
    selectedRecipes: string[]
}>()
</script>

<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-12 mb-2 mt-4">
                <h2 class="fw-light">👩‍🍳 Recipes</h2>
            </div>

            <div class="col-md-6 mb-3">
                <select
                    @input="onSelectRecipe"
                    class="form-select form-select-lg"
                    multiple
                >
                    <template v-for="recipe in recipes" :key="recipe">
                        <option
                            v-if="
                                filteredRecipes.includes(recipe) ||
                                selectedRecipes.includes(recipe)
                            "
                            :selected="selectedRecipes.includes(recipe)"
                            :value="recipe"
                        >
                            {{ recipe }}
                        </option>
                    </template>
                </select>
            </div>
        </div>
    </div>
</template>
