<script>
  import { Doughnut } from 'vue-chartjs'
  export default Doughnut.extend({
    data: function () {
      return {
      }
    },
    props: [
      'data',
      'json',
      'label',
      'colorset'
    ],
    computed: {
    },
    mounted () {
      // Overwriting base render method with actual data.
      this.renderChart({
        labels: this.json[0],
        datasets: [
          {
            label: this.json[2][0],
            hoverBackgroundColor: '#ffffff',
            backgroundColor: this.colorset,
            data: this.json[1]
          }
        ]
      })
    }
  })
</script>

