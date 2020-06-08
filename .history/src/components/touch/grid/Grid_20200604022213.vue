
<template>
    <div class="justify-center align-center" 
    style="display: grid; width: 100%; height: 100%; grid-gap: 1rem;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-rows: repeat(8, minmax(0, 1fr));">
        <slot/>
    </div>
</template>